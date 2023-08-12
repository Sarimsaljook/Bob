import * as React from 'react';

import WelcomeScreen from './WelcomeScreen';
import Login from './Login';
import SignUp from './SignUp';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Sign Up" component={SignUp}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

