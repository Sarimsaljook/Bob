import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StockTickerCard from './components/StockTickerCard';
import AnimatedLoader from "react-native-animated-loader";

export default function TheBestToInvest({ navigation, route, username }) {

  const [top5BestStocks, setTop5BestStocks] = useState([]);
  const [top5Loaded, setTop5Loaded] = useState(false);

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (username) {
      setEmail(username);
    }

    // Check if top5BestStocks is already populated, if yes, return early to avoid re-fetching.
    if (top5BestStocks.length > 0) {
      return;
    }
      axios.get('http://192.168.68.71:3000/api/getBestToInvest')
              .then((res) => {
                 setTop5BestStocks(res.data);
                 console.log(res.data);
                 setTop5Loaded(true);
            }).catch(error => console.log(error));
        }, []);

     const name = email.split('@')[0];      
        
  return (     
             top5Loaded ?
      <ScrollView>        
        <View style={styles.container}>
           <Text style={styles.headingText}>Top 5 Best To Invest Today</Text>   
           <View style={styles.top5ListContainer}>
              {top5BestStocks.map((stock, index) => <StockTickerCard symbol={stock} rank={index + 1} username={name}/>)}
           </View>
        </View>
      </ScrollView> : 
            <View>
              <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("./loader.json")}
                animationStyle={styles.lottie}
                speed={1}>
                <Text style={{ fontSize: 20 }}>Loading Todays Hot New Stocks...</Text>
                </AnimatedLoader>
            </View>   
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 100,
    height: 100
  },
  headingText: {
    fontSize: 35,
    marginTop: 20,
    fontWeight: 'bold'
  },
  top5ListContainer: {
    marginLeft: 50,
    marginTop: 5
  }
});