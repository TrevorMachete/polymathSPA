import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './screens/HomeScreen'; 
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import TosScreen from './screens/TosScreen'; 
import PpScreen from './screens/PpScreen';
import CookiesScreen from './screens/CookiesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Polymath" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Terms" component={TosScreen} />
        <Stack.Screen name="Privacy" component={PpScreen} />
        <Stack.Screen name="Cookies" component={CookiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
