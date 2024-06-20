import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ImageBackground, Pressable, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState('music');
  const [difficulty, setDifficulty] = useState('easy');
  const [limit, setLimit] = useState('2');
  const [menuVisible, setMenuVisible] = useState(false);
  const [initialCount, setInitialCount] = useState(0); // Initial countdown time
  const [count, setCount] = useState(initialCount); // New state for countdown timer
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers per question
  const [gameStarted, setGameStarted] = useState(false);

  const fetchFonts = async () => {
    await Font.loadAsync({
      'Raleway-Regular': require('../assets/fonts/Raleway-VariableFont_wght.ttf'),
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);



  const queryString = `categories=${categories}&difficulty=${difficulty}&limit=${limit}`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?${queryString}`);
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setQuestions(data);
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
  
  const handleAnswerPress = (questionIndex, answerIndex) => {
    setSelectedAnswers(prevState => ({
   ...prevState,
      [questionIndex]: answerIndex,
    }));
  };

  const handleSubmitAllAnswers = () => {
    let correctAnswersCount = 0;
    questions.forEach((question, questionIndex) => {
      const correctAnswerIndex = question.incorrectAnswers.length;
      const selectedAnswerIndex = selectedAnswers[questionIndex];

      if (selectedAnswerIndex === correctAnswerIndex) {
        correctAnswersCount++;
      }
    });

    setScore(score + correctAnswersCount);
    Alert.alert(`${correctAnswersCount} Correct`, `You got ${correctAnswersCount} answers right.`);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handlePress = async () => {
    setGameStarted(false); // Temporarily set to false to trigger useEffect
    setInitialCount(10); // Reset the countdown timer to 30 seconds
    console.log(setInitialCount + 'passed')
    Alert.alert('Game Started!', 'You have started the game.');

    // After setting gameStarted to false, immediately set it back to true
    setTimeout(() => {
      setGameStarted(true);
    }, 0); // Use a timeout with delay 0 to ensure this runs after the current call stack clears
  };
  
// Adjusted useEffect for countdown management
useEffect(() => {
  let timer;
  
  // Start the countdown if the game has started and initialCount is greater than 0
  if (gameStarted && initialCount > 0) {
    timer = setInterval(() => {
      setCount(prevCount => {
        // Update isCountdownFinished when the countdown reaches zero
        if (prevCount <= 0) {
          clearInterval(timer);
          setIsCountdownFinished(true); // Set countdown finished to true
          return prevCount; // Prevent further decrements
        }
        return prevCount - 1;
      });
    }, 1000);
  } else if (!gameStarted) {
    // If the game is not started, reset the count to initialCount
    setCount(initialCount);
  }

  // Cleanup function to clear the interval
  return () => clearInterval(timer);
}, [gameStarted, initialCount]); // Depend on gameStarted and initialCount

useEffect(() => {
  // Call handleSubmitAllAnswers when the countdown finishes
  if (isCountdownFinished) {
    handleSubmitAllAnswers();
    setIsCountdownFinished(false); // Reset the flag after calling handleSubmitAllAnswers
  }
}, [isCountdownFinished, handleSubmitAllAnswers]);


useEffect(() => {
  fetchFonts();
  setFontLoaded(true);
}, []);

if (!fontLoaded) {
  return (
    <View>
      <Text>Loading...</Text>
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
          <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={[styles.title, { fontFamily: 'Times New Roman' }]}>Polymath</Text>

          </Pressable>
          <Text style={[styles.subtitle, { fontFamily: 'Times New Roman' }]}>Unleash Your Inner Genius</Text>
        </View>

        <View style={styles.hamburgerPlay}>
          {/* Hamburger icon */}
          <Pressable style={styles.hamburger} onPress={toggleMenu}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
          </Pressable>
        </View>
        </LinearGradient>

{/* Navigation and sound button */}
{menuVisible && (
  <View style={styles.navBtn}>
    <Pressable
      style={[styles.menuItem, { backgroundColor: "white" }]}
      onPress={() => navigation.navigate("About")}
    >
      <Text style={styles.menuItemText}>About</Text>
    </Pressable>
    <Pressable
      style={styles.menuItem}
      onPress={() => navigation.navigate("Help")}
    >
      <Text style={styles.menuItemText}>Help</Text>
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
            <Text>Category</Text>
            <Picker
              selectedValue={categories}
              onValueChange={(itemValue) => setCategories(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Music" value="music" />
              <Picker.Item label="Geography" value="geography" />
              {/* ... other categories */}
            </Picker>
          </View>

          {/* Difficulty Picker */}
          <View style={styles.pickerContainer}>
            <Text>Difficulty</Text>
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
            <Text>Limit</Text>
            <Picker
              selectedValue={limit}
              onValueChange={(itemValue) => setLimit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="1 Question" value="1" />
              <Picker.Item label="2 Questions" value="2" />
              {/* ... other limits */}
            </Picker>
          </View>
        </View>
        <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>Warning Text!</Text>
        </View>
        <View style={styles.countdownTimer}>
          <Text style={styles.countdownText}>{count}</Text>
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
            {question.incorrectAnswers.map((answer, answerIndex) => (
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
            <Pressable
              onPress={() => handleAnswerPress(questionIndex, question.incorrectAnswers.length)}
            >
              <Text
                style={[
                  styles.answerText,
                  selectedAnswers[questionIndex] === question.incorrectAnswers.length && styles.selectedAnswer,
                ]}
              >
                {question.correctAnswer}
              </Text>
            </Pressable>
          </View>
        ))}
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
  title: {
    fontFamily: 'Times New Roman',
  },
  subtitle: {
    fontFamily: 'Raleway-Regular',
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
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    overflow: 'visible',
    //borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Only for iOS

  },
  heading: {
    fontFamily: 'Times New Roman',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  menus: {
    // styles for menus
  },
  hamburgerPlay: {
    // styles for hamburgerPlay
  },
  hamburger: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: 'black',
    marginVertical: 2,
  },
  navBtn: {
    // styles for navBtn
    position: 'absolute',
    top: 70,
    backgroundColor: 'white', // Background color for the dropdown
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '50%',
    right: 0,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuItem: {
    marginBottom: 5,
  },
  menuItemText: {
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
  },
  startGameButton: {
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  startGameButtonText: {
    color: 'white',
   
  },
  questionContainer: {
    flex: 1,
    margin: 10,
    fontSize: 16,
  },
  countdownTimer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 10,
  },
  countdownText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
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
    backgroundColor: 'green',
    textAlign: 'center',
    borderRadius: 5,
  },
  submitAllButtonText: {
    textAlign: 'center',
    
  },
  scrollContainer: {
    flex: 1,
  },
});