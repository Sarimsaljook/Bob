import { StyleSheet, Text, View } from 'react-native';

export default function WhatsNew({ navigation, route }) {

  return (
     <View style={styles.container}>
           <Text>What's New?</Text>
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