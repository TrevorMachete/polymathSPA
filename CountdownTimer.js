import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ initialCount, onComplete }) => {
  const [count, setCount] = useState(initialCount);
  let timeoutId; // Define timeoutId here

  useEffect(() => {
    // Function to handle countdown logic
    const handleCountdown = () => {
      if (count > 0) {
        const newCount = count - 1;
        setCount(newCount);
        timeoutId = setTimeout(handleCountdown, 1000); // Assign the timeout ID to timeoutId
      } else {
        onComplete(); // Call onComplete when countdown reaches 0
      }
    };

    // Start the countdown
    handleCountdown();

    // Cleanup function to clear the timeout when the component unmounts
    // or when initialCount changes
    return () => {
      clearTimeout(timeoutId); // Use the defined timeoutId here
      onComplete();
    };
  }, [count, onComplete, initialCount]); // Dependencies include count, onComplete, and initialCount

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(count)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 10,
  },
  timerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CountdownTimer;
