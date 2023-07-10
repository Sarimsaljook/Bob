import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

const API_URL = 'https://localhost:3000/api/addUser';

const addRecordToDynamoDB = async ({ fullName, username, password, preferredTradingStyle, generalInvestmentSector }) => {
  try {
    const record = {
      Name: fullName,
      Username: username,
      Password: password,
      PreferredTradingStyle: preferredTradingStyle,
      GeneralInvestmentSector: generalInvestmentSector,
    };

    // Make the POST request to the API endpoint
    const response = await axios.post(API_URL, record);
    console.log('Record added successfully:', response.data);
  } catch (error) {
    console.error('Error adding record:', error);
  }
};


export default function SignUp() {

  const [fullname, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [preferredTradingStyle, setPreferredTradingStyle] = useState('');
  const [generalInvestmentSector, setGeneralInvestmentSector] = useState('');

  return (
    <View style={styles.container}>
      <Text>Sign Up Page!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});