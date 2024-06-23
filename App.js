import React from 'react';
import { SafeAreaView } from 'react-native';
import { registerRootComponent } from 'expo';
import AppNavigator from './AppNavigator';

function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
}

// Register the root component
registerRootComponent(App);

export default App;

