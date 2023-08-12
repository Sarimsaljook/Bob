import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const LearnMoreScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Learn More About Stocks</Text>

            <Text style={styles.subHeadingText}>The Basics</Text>
            <Text style={styles.textStyle}>Stocks are like pieces of a company that you can buy. When a company does well, the value of the stocks can go up. When the company doesn't do well, the value can go down. People buy and sell stocks to try to make money.</Text>

            <Text style={styles.subHeadingText}>Key Words</Text>
            <Text style={styles.textStyle}>
                Stock: A share of ownership in a company, representing a part of its value.
                </Text>
                <Text style={styles.textStyle}>
                Market: A place where stocks are bought and sold, like the stock market.
                </Text>
                <Text style={styles.textStyle}>
                Price: The cost of one share of a company's stock.</Text>
                <Text style={styles.textStyle}>
                Dividend: Money that a company sometimes gives to its stockholders as a share of its profits.</Text>
                <Text style={styles.textStyle}>
                Investor: Someone who buys stocks with the hope of making money as the company grows.</Text>          


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      headingText: {
        fontSize: 35,
        marginTop: 20,
        fontWeight: 'bold'
      },
      subHeadingText: {
        marginTop: 30,
        marginLeft: -170,
        fontWeight: '300',
        fontSize: 25,
      },
      textStyle: {
        marginTop: 10,
        marginLeft: 1,
        fontSize: 15,
        width: 300
      }
})

export default LearnMoreScreen;
