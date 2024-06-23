import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ImageBackground, Pressable, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import SimpleLottie from '../SimpleLotti';

// Initialize the first sound
const startGameAudio = new Audio.Sound();

// Initialize the second sound
const selectAnswerAudio = new Audio.Sound();

// Initialize the third sound
const gameOverAudio = new Audio.Sound();

async function loadSounds() {
  try {
    await startGameAudio.loadAsync(require('../assets/audio/newQuestion.mp3'));

    await selectAnswerAudio.loadAsync(require('../assets/audio/answerSelect.mp3'));

    await gameOverAudio.loadAsync(require('../assets/audio/gameOver.mp3'));

    console.log('Audio files loaded successfully!');
  } catch (error) {
    console.error('Error loading audio files:', error);
  }
}

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState('music');
  const [difficulty, setDifficulty] = useState('easy');
  const [limit, setLimit] = useState('1');
  const [menuVisible, setMenuVisible] = useState(false);
  const [initialCount, setInitialCount] = useState(0); // Initial countdown time
  const [count, setCount] = useState(initialCount); // New state for countdown timer
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers per question
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadSounds(); // Load both sounds when the component mounts
  }, []);

  const fetchFonts = async () => {
    await Font.loadAsync({
      'Raleway-Regular': require('../assets/fonts/Raleway-VariableFont_wght.ttf'),
      'Times New Roman': require('../assets/fonts/times_new_roman.ttf'),
    });
    setFontLoaded(true); // Set fontLoaded to true after fonts are loaded
  };

  const queryString = `categories=${categories}&difficulty=${difficulty}&limit=${limit}`;
  
  useEffect(() => {
    fetchFonts();
    const fetchData = async () => {
      try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?${queryString}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          // Shuffle the answers for each question here
          const shuffledQuestions = data.map(question => ({
           ...question,
            answers: shuffleArray([...question.incorrectAnswers, question.correctAnswer]),
          }));

          setQuestions(shuffledQuestions);
              // Play the first sound after fetching data
          try {
            await startGameAudio.playAsync();
           } catch (error) {
             console.error(error);
           }
        } else {
          console.error("Data fetched from API is undefined or not an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    if (gameStarted) {
      fetchData();
      
    }
  }, [queryString, gameStarted]); // Depend on gameStarted
  
  const handleAnswerPress = async (questionIndex, answerIndex) => {
    setSelectedAnswers(prevState => ({
   ...prevState,
      [questionIndex]: answerIndex,
    }));
        // Play the second sound when an answer is selected
        try {
          await selectAnswerAudio.playAsync();
        } catch (error) {
          console.error(error);
        }
  };

  // Handle feedback submission
  const handleSubmitAllAnswers = async () => {
    setQuestions([]); // Clear the questions state
    setFeedback(''); // Clear the feedback state

    // Play the second sound when an answer is selected
    try {
      await gameOverAudio.playAsync();
    } catch (error) {
      console.error(error);
    }

    let correctAnswersCount = 0;
    let incorrectAnswersClarification = [];

    questions.forEach((question, questionIndex) => {
      // Find the index of the correct answer within the shuffled answers
      const correctAnswerIndex = question.answers.findIndex(answer => answer === question.correctAnswer);
      const selectedAnswerIndex = selectedAnswers[questionIndex];

      if (selectedAnswerIndex === correctAnswerIndex) {
        correctAnswersCount++;
      } else {
        // Collect clarification for incorrect answers
        incorrectAnswersClarification.push({
          questionNumber: questionIndex + 1, // Assuming questionIndex starts at 0
          correctAnswer: question.correctAnswer,
          userSelected: question.answers[selectedAnswerIndex],
        });
      }
    });
  
    // Prepare feedback messages
    const feedbackMessage = `Score: ${correctAnswersCount} Correct`;
    const clarificationMessage = incorrectAnswersClarification.length? `\n\nIncorrect answers clarified below:\n\n${incorrectAnswersClarification.map((item, index) => `${item.questionNumber}. Correct Answer: ${item.correctAnswer}, Selected: ${item.userSelected || '\'Nada.\''}`).join('\n\n')}` : '';
  
      //setScore(score + correctAnswersCount);
    //Alert.alert(`${correctAnswersCount} Correct`, `You got ${correctAnswersCount} answers right.`);
    setFeedback(`${feedbackMessage}\n${clarificationMessage}`);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handlePress = async () => {
    setGameStarted(false); // Temporarily set to false to trigger useEffect
    setInitialCount(10 * limit); // Reset the countdown timer to 30 seconds

    // Clear all previous answer selections
    setSelectedAnswers({});

    // After setting gameStarted to false, immediately set it back to true
    setTimeout(() => {
      setGameStarted(true);
    }, 0); // Use a timeout with delay 0 to ensure this runs after the current call stack clears
  };
  
// Adjusted useEffect for countdown management
useEffect(() => {
  let timer;

  if (gameStarted && initialCount > 0) {
    timer = setInterval(() => {
      setCount(prevCount => {
        const totalSeconds = prevCount;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Update isCountdownFinished when the countdown reaches zero
        if (totalSeconds <= 0) {
          clearInterval(timer);
          setIsCountdownFinished(true); // Set countdown finished to true
          return totalSeconds; // Prevent further decrements
        }
        return totalSeconds - 1;
      });
    }, 1000);
  } else if (!gameStarted) {
    setCount(initialCount);
  }

  return () => clearInterval(timer);
}, [gameStarted, initialCount]);

useEffect(() => {
  // Call handleSubmitAllAnswers when the countdown finishes
  if (isCountdownFinished) {
    handleSubmitAllAnswers();
    setIsCountdownFinished(false); // Reset the flag after calling handleSubmitAllAnswers
  }
}, [isCountdownFinished, handleSubmitAllAnswers]);

if (!fontLoaded) {
  return (
    <View style={styles.lottie}>
      <SimpleLottie />
      <>
      <Text style= {styles.lottieText}>Polymath is Loading</Text>
      </>
    </View>
  );
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <>
      <LinearGradient
        colors={['rgb(31, 24, 59)', 'rgb(178, 223, 182)']}
        style={styles.navigation}
      >
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: 40,
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'serif',
              textDecorationLine: 'underline',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            Polymath
          </Text>

            <Text
              style={{
                fontSize: 13,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'serif',
                textShadowOffset: { width: 2, height: 0 },
                textShadowRadius: 4,
                textShadowColor: 'rgba(1, 1, 1, 1)',
              }}
            >
              Unleash Your Inner Genius
            </Text>
        </View>

        <View>
          <Pressable style={styles.hamburger} onPress={toggleMenu}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
          </Pressable>
        </View>
        </LinearGradient>

{menuVisible && (
  <View style={styles.navBtn}>
    <Pressable
      style={styles.menuItem}
      onPress={() => navigation.navigate("About")}
    >
      <Text style={styles.menuItemText}>About</Text>
    </Pressable>
    <Pressable
      style={styles.menuItem}
      onPress={() => navigation.navigate("Contact")}
    >
      <Text style={styles.menuItemText}>Contact</Text>
    </Pressable>
  </View>
)}

    </>
      <ImageBackground
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/polymathquest00.appspot.com/o/images%2Fbg.jpeg?alt=media&token=11b224d2-0d5f-4c52-8dde-c0e64ff41e08' }}
        resizeMode='cover'
        style={styles.backgroundImage}
      >

<View style={styles.pickerRow}>
  {/* Category Picker */}
  <View style={styles.pickerContainer}>
    <Text style={styles.label}>Category</Text>
    <Picker
      selectedValue={categories}
      onValueChange={(itemValue) => setCategories(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Music" value="music" />
      <Picker.Item label="Sport and Leisure" value="sport_and_leisure" />
      <Picker.Item label="Film and TV" value="film_and_tv" />
      <Picker.Item label="Arts and Literature" value="arts_and_literature" />
      <Picker.Item label="History" value="history" />
      <Picker.Item label="Society and Culture" value="society_and_culture" />
      <Picker.Item label="Science" value="science" />
      <Picker.Item label="Geography" value="geography" />
      <Picker.Item label="Food and Drink" value="food_and_drink" />
      <Picker.Item label="General Knowledge" value="general_knowledge" />
    </Picker>
  </View>

  {/* Difficulty Picker */}
  <View style={styles.pickerContainer}>
    <Text style={styles.label}>Difficulty</Text>
    <Picker
      selectedValue={difficulty}
      onValueChange={(itemValue) => setDifficulty(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Easy" value="easy" />
      <Picker.Item label="Medium" value="medium" />
      <Picker.Item label="Hard" value="hard" />
    </Picker>
  </View>

  {/* Limit Picker */}
  <View style={styles.pickerContainer}>
    <Text style={styles.label}>Limit</Text>
    <Picker
      selectedValue={limit}
      onValueChange={(itemValue) => setLimit(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="1 Question" value="1" />
      <Picker.Item label="2 Questions" value="2" />
      <Picker.Item label="3 Question" value="3" />
      <Picker.Item label="4 Questions" value="4" />
      <Picker.Item label="5 Question" value="5" />
      <Picker.Item label="6 Questions" value="6" />
      <Picker.Item label="7 Question" value="7" />
      <Picker.Item label="8 Questions" value="8" />
      <Picker.Item label="9 Question" value="9" />
      <Picker.Item label="10 Questions" value="10" />
      <Picker.Item label="15 Question" value="15" />
      <Picker.Item label="20 Questions" value="20" />
    </Picker>
  </View>
</View>


        {/*
        <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>Warning Text!</Text>
        </View>
        */}

        <View style={styles.countdownTimer}>
          <Text style={styles.countdownText}>
            {`${Math.floor(count / 60).toString().padStart(2, '0')}:${(count % 60).toString().padStart(2, '0')}`}
          </Text>
        </View>
        
        <View>
        <Pressable
          onPress={handlePress}
          style={styles.startGameButton}
        >
          <Text style={styles.startGameButtonText}>Start</Text>
        </Pressable>
    </View>

        {/* Display Questions */}
        <View style={styles.scrollContainer}>
      <ScrollView>
      {questions.map((question, questionIndex) => (
  <View key={questionIndex} style={styles.questionCard}>
    <Text style={styles.questionText}>{question.question}</Text>
    {question.answers.map((answer, answerIndex) => (
      
      <Pressable
        key={answerIndex}
        onPress={() => handleAnswerPress(questionIndex, answerIndex)}
      >
        <Text
          style={[
            styles.answerText,
            selectedAnswers[questionIndex] === answerIndex && styles.selectedAnswer,
          ]}
        >
          {answer}
        </Text>
      </Pressable>
    ))}
  </View>
))}


{feedback && (
    <View style={styles.feedbackContainer}>
      <Text style={styles.feedbackText}>{feedback}</Text>
    </View>
  )}

      </ScrollView>
    </View>
    
        <View>
          <Pressable
            onPress={handleSubmitAllAnswers}
            style={styles.submitAllButton}
          >
            <Text style={styles.submitAllButtonText}>Submit All</Text>
          </Pressable>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieText: {
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    zIndex: 0,
  },
    navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    overflow: 'visible',
    //borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 0,
    shadowColor: 'white',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Only for iOS

  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 5,
    marginTop: 10,
  },
  picker: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    backgroundColor: '#011124',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'Times New Roman',
  },
  hamburger: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: 'white',
    marginVertical: 2,
  },
  navBtn: {
    position: 'absolute',
    top: 80,
    backgroundColor: '#dbd1cb',
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 100,
    width: '100%',
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Only for iOS
  },
  menuItem: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'normal',
  },
  startGameButton: {
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 4,
    textShadowColor: 'rgba(1, 1, 1, 1)',
  },
  startGameButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 4,
    textShadowColor: 'rgba(1, 1, 1, 1)',
  },
  questionContainer: {
    flex: 1,
    margin: 10,
    fontSize: 16,
  },
  countdownTimer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#011124',
    borderRadius: 0,
    marginTop: 10,
  },
  countdownText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 4,
    textShadowColor: 'rgba(1, 1, 1, 1)',
  },
  warningTextContainer: {
    alignItems: 'center',
    fontFamily: 'Raleway-Regular',
  },
  warningText: {
    color: 'red',
    fontSize: 14,
    margin: 5,
    fontFamily: 'Raleway-Regular',

  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Raleway-Regular',
  },
  questionCard: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    fontFamily: 'Raleway-Regular',
  },
  selectedAnswer: {
    color: 'white',
    backgroundColor: 'blue',
  },
  submitAllButton: {
    padding: 10,
    margin: 10,
    backgroundColor: '#021730',
    textAlign: 'center',
    borderRadius: 5,
  },
  submitAllButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  feedbackContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
});
