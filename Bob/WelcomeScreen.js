import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen({ navigation }) {
  return (
     <View style={styles.container}>
      <LinearGradient
        colors={['#003973', '#fb5b5a']}
        style={styles.linearGradient}
      >
      <Text style={styles.welcomeLabel}>Welcome To Bob!</Text>
      <Image style={styles.image} source={require('./assets/bobWelcomeScreenIMG.png')}/>
      <Text style={styles.description}>Telling You The Best To Invest</Text>

      <TouchableOpacity style={styles.loginButtonContainer} onPress={() => navigation.navigate("Login")}>
         <Text style={{ color: 'white', fontSize: 25, fontFamily: 'monospace'}}>Login</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.signUpButtonContainer} onPress={() => navigation.navigate("Sign Up")}>
         <Text style={{ color: 'white', fontSize: 25, fontFamily: 'monospace'}}>Sign Up</Text>
     </TouchableOpacity>

      <StatusBar style="auto" />
      </LinearGradient>
         </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeLabel: {
    color: "lightblue",
    fontSize: 40,
    fontFamily: "sans-serif-condensed",
    marginTop: -25
  },

  image: {
    marginTop: 35,
    width: 125,
    height: 125,
    borderRadius: 15
  },

  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },

  description: {
    marginTop: 30,
    fontSize: 18,
    fontFamily: "serif",
    fontWeight: "900",
    color: "white",
    padding: 15,
    backgroundColor: "teal",
    borderRadius: 15
  },

  loginButtonContainer: {
    marginTop: 80,
    backgroundColor: "#132a36",
    borderRadius: 25,
    alignItems: 'center',
    width: 200,
    padding: 10
    
  },

  signUpButtonContainer: {
    marginTop: 25,
    backgroundColor: "#067857",
    padding: 10,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  }
});
