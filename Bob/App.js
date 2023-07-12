import * as React from 'react';
import WelcomeScreen from './WelcomeScreen';
import Login from './Login';
import SignUp from './SignUp';
import { Router, Stack, Scene } from 'react-native-router-flux';

export default function App() {
  return (
    <Router>
      <Stack key="root">
        <Scene key="welcome" component={WelcomeScreen} initial={true}/>
        <Scene key="login" component={Login} title="Login" />
        <Scene key="signup" component={SignUp} title="SignUp" />
     </Stack>
  </Router>
  );
}

