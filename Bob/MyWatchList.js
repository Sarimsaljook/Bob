import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import StockTickerCard from './components/StockTickerCard';

export default function MyWatchlist({ navigation, route, username }) {

  const [email, setEmail] = useState('');
  const [myWatchList, setMyWatchList] = useState([]);

  const [usernameExists, setUsernameExists] = useState(false);

  useEffect(() => {
    if (username !== '') {
      setEmail(username);
      setUsernameExists(true);
    }
  
    // Move the code that requires the updated email into a separate block
    if (usernameExists && email !== '' && myWatchList.length === 0) {
      const reqName = email.split('@')[0];
  
      axios
        .post('http://192.168.68.71:3000/api/getUserWatchList', {
          username: reqName,
        })
        .then((res) => {
          setMyWatchList(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    } else { 
      // WAIT FOR WATCHLIST LOAD...
     }
  }, [usernameExists, email, myWatchList]);

  const name = email.split('@')[0];  

  return (
     <View style={styles.container}>
           <Text style={styles.headingText}>My WatchList</Text>
           <Text>_________________________________________________</Text>

         {usernameExists ? <ScrollView>
         <View style={styles.top5ListContainer}>
              {myWatchList.map((stock, index) => <StockTickerCard symbol={stock} rank={index + 1} username={name} />)}
           </View> 
           </ScrollView>
           : (
          <View style={styles.top5ListContainer}> 
            <Text>Loading Your WatchList...</Text>
          </View>  
          )}

       </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 45,
    marginTop: 25,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  top5ListContainer: {
    marginLeft: 50,
    marginTop: 10
  }
});