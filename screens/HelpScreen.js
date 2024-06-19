import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Help = () => {
  return (
    <View style={styles.container}>
      <Text>Help Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Help;
