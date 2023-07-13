import * as React from 'react';

import WelcomeScreen from './WelcomeScreen';
import Login from './Login';
import SignUp from './SignUp';

import { BaseNavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BaseNavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
}

