import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-native-elements';

export default function TheBestToInvest({ navigation, route }) {

  const [top5BestStocks, setTop5BestStocks] = useState([]);

   useEffect(() => {
      axios.get('http://192.168.68.80:3000/api/getBestToInvest')
              .then((res) => {
                 setTop5BestStocks(res.data);
                 console.log(res.data);
            }).catch(error => console.log(error));
        }, []);
        
  return (
     <View style={styles.container}>
           <Text onPress={() => console.log(top5BestStocks)}>The Best To invest</Text>
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