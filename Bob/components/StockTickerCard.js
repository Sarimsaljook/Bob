import React, { useState } from "react";
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function StockTickerCard({ symbol, rank }) {

    const [price, setPrice] = useState();
    const [change, setChange] = useState('');

    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ZCQDT96VBC5WB0KO`)
        .then((res) => {
            setPrice(res.data['Global Quote']['05. price']);
            setChange(res.data['Global Quote']['10. change percent']);
        }).catch((err) => console.log(err));
  
    // Removing % from change    
    const formattedChange = change.replace('%', '');
    const changeNumber = parseFloat(formattedChange).toFixed(2);

    const handleGoogleSearch = async () => {
        const searchQuery = `${symbol} stock`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    
        // Open the search URL using the Linking module
        const supported = await Linking.canOpenURL(searchUrl);
        if (supported) {
          await Linking.openURL(searchUrl);
        } else {
          console.log("Don't know how to open URL: " + searchUrl);
        }
      };
    

  return (
     <TouchableOpacity style={styles.card} onPress={handleGoogleSearch}>
           <View style={styles.cardContent}>
             <Text style={{ fontSize: 15, backgroundColor: 'blue', padding: 10, color: 'white', fontWeight: 'bold', borderRadius: 10 }} >{rank}.</Text>
             <Text style={{ fontSize: 20, paddingTop: 10, fontWeight: 'bold' }}>   {symbol} - ${parseFloat(price).toFixed(2)} - </Text>
             <Text style={{ fontSize: 15, backgroundColor: 'green', padding: 10, color: 'white', fontWeight: 'bold', borderRadius: 10 }} >{changeNumber}%  ⬆️</Text>
           </View>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 10,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        marginTop: 20,
        marginLeft: -60,
        borderRadius: 15
        },
        
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
        flexDirection: 'row',
        }
});
