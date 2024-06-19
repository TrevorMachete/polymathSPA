import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ImageBackground, Pressable, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CountdownTimer from '../CountdownTimer';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState('music');
  const [difficulty, setDifficulty] = useState('easy');
  const [limit, setLimit] = useState('1');
  
  const [menuVisible, setMenuVisible] = useState(false);
  const onPressHandler = () => {
    alert('Button pressed!');
  };

  const [countdown, setCountdown] = useState(30); // Set the initial countdown time

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

    // State to hold the fetched questions
    const [questions, setQuestions] = useState([]);

    // Function to fetch questions
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?categories=${categories}&difficulty=${difficulty}&limit=${limit}`);
        const json = await response.json();
        setQuestions(json.results);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Call fetchQuestions whenever categories, difficulty, or limit changes
    useEffect(() => {
      fetchQuestions();
    }, [categories, difficulty, limit]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <>
      <View style={styles.navigation}>
        <View style={styles.heading}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Text style={styles.title}>Polymath</Text>
          </Pressable>
          <Text style={styles.subtitle}>Unleash Your Inner Genius</Text>
        </View>

        <View style={styles.hamburgerPlay}>
          {/* Hamburger icon */}
          <Pressable style={styles.hamburger} onPress={toggleMenu}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
          </Pressable>
        </View>
      </View>

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
        <CountdownTimer initialCount={countdown} />
        </View>
        <View>
      <Pressable
        onPress={onPressHandler}
        style={styles.startGameButton}
      >
        <Text style={styles.startGameButtonText}>Start</Text>
      </Pressable>
    </View>

    <View style={styles.questionContainer}>
  {Array.isArray(questions) && questions.length > 0? (
    questions.map((question, index) => (
      <Text key={index} style={styles.questionText}>{question.questionText}</Text>
    ))
  ) : (
    <Text style={styles.questionText}>No questions found.</Text>
  )}
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
    //justifyContent: 'center',
    zIndex: 0,
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
    backgroundColor: '#f3f3f3', // Example background color
  },
  heading: {
    // styles for heading
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
    // Add your styles here
    margin: 10,
    padding: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  questionText: {
    // Add your styles here
    fontSize: 18,
  },
  countdownTimer: {
    alignItems: 'center',
  },
  warningTextContainer: {
    alignItems: 'center',
  },
  warningText: {
    color: 'red',
    fontSize: 14,
  }
});