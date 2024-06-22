import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SimpleLottie() {
  return (
    <View>
      <LottieView
        source={require('./assets/loading.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});
