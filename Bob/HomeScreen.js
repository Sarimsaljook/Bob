import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
     <View style={styles.container}>
           <Text>Home Page</Text>
       </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});