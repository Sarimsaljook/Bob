import { StyleSheet, Text, View } from 'react-native';

export default function Login({ navigation }) {
  return (
   <NavigationContainer>
       <View>
           <Text>Login Page</Text>
       </View>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});