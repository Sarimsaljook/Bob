import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function MyWatchlist({ navigation, route }) {

  return (
     <View style={styles.container}>
           <Text>My WatchList</Text>
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