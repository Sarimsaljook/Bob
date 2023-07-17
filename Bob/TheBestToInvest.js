import { StyleSheet, Text, View } from 'react-native';

export default function TheBestToInvest({ navigation, route }) {
  return (
     <View style={styles.container}>
           <Text>The Best To invest</Text>
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