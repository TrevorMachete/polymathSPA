import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

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
    // Add your styles here
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 10,
  },
  timerText: {
    // Add your styles here
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CountdownTimer;
