import { StyleSheet, Text, View } from 'react-native';

export default function SignUp({ navigation }) {
  return (
   <NavigationContainer>
       <View>
           <Text>Sign Up Page</Text>
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