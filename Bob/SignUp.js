import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

export default function SignUp({ navigation }) {
  const [open, setOpen] = useState(false);
  const [prefferedTradingStyle, setPrefferedTradingStyle] = useState(null);
  const [items, setItems] = useState([
    {label: 'Day Trading', value: 'Day Trading'},
    {label: 'Buy and Hold', value: 'Buy and Hold'},
    {label: 'Reccuring Investments', value: 'Reccuring Investments'},
    {label: 'Event Based Trading', value: 'Event Based Trading'},
    {label: 'Swing Trading', value: 'Swing Trading'},
  ]);

  const [openMS, setOpenMS] = useState(false);
  const [prefferedMarketSector, setPrefferedMarketSector] = useState(null);
  const [markets, setMarkets] = useState([
    {label: 'Technology', value: 'Technology'},
    {label: 'Healthcare', value: 'Healthcare'},
    {label: 'Financials', value: 'Financials'},
    {label: 'Consumer Discretionary', value: 'Consumer Discretionary'},
    {label: 'Consumer Staples', value: 'Consumer Staples'},
    {label: 'Energy', value: 'Energy'},
    {label: 'Utilities', value: 'Utilities'},
    {label: 'Industrials', value: 'Industrials'},
    {label: 'Materials', value: 'Materials'},
    {label: 'Real Estate', value: 'Real Estate'},
    {label: 'Communication Services', value: 'Communication Services'},
    {label: 'Automotive', value: 'Automotive'},
    {label: 'Transportation', value: 'Transportation'},
    {label: 'Aerospace and Defense', value: 'Aerospace and Defense'},
    {label: 'Retail', value: 'Retail'},
    {label: 'Entertainment', value: 'Entertainment'},
    {label: 'Biotechnology', value: 'Biotechnology'},
    {label: 'Semiconductors', value: 'Semiconductors'},
    {label: 'Insurance', value: 'Insurance'},
    {label: 'Pharmaceuticals', value: 'Pharmaceuticals'}
  ]);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpUser = () => {
    axios.post('https://localhost:5000/api/addUser', {
      Name: name,
      Username: email,
      Password: password,
      PreferredTradingStyle: prefferedTradingStyle,
      GeneralInvestmentSector: prefferedMarketSector
    }).then((res) => {
      console.log(res);
      navigation.navigate("Login");
    }).catch((err) => console.log(err))
  };

  return (
  <ScrollView>
    <View style={styles.container}>

      <Text style={styles.logo}>Sign Up For Bob!</Text>

      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Full Name..." 
          placeholderTextColor="#FFFF"
          onChangeText={(e) => setName(e)}/> 
      </View>

      <View style={styles.inputView} >
        <TextInput 
          style={styles.inputText}
          placeholder="Username/Email..." 
          placeholderTextColor="#FFFF"
          onChangeText={(e) => setEmail(e)}/>
      </View>

      <View style={styles.inputView} >
        <TextInput 
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..." 
          placeholderTextColor="#FFFF"
          onChangeText={(e) => setPassword(e)}/>
      </View>

      <View style={styles.inputViewCustom}>
        <Text style={styles.dropDownLabel}>Trading Style</Text>  
            <DropDownPicker
              open={open}
              value={prefferedTradingStyle}
              items={items}
              setOpen={setOpen}
              setValue={setPrefferedTradingStyle}
              setItems={setItems}
              dropDownDirection="TOP"
              autoScroll={true}
            />
      </View>

      <View style={styles.inputViewCustom} >
        <Text style={styles.dropDownLabel}>Preferred Market Sector</Text>  
          <DropDownPicker
              open={openMS}
              value={prefferedMarketSector}
              items={markets}
              setOpen={setOpenMS}
              setValue={setPrefferedMarketSector}
              setItems={setMarkets}
              dropDownDirection="TOP"
              autoScroll={true}
            />
      </View>


      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.signUpText} onClick={signUpUser()}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onAccessibilityTap={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already Have an Account?</Text>
      </TouchableOpacity>
      </View>
  </ScrollView>  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize: 42,
    color:"#fb5b5a",
    marginBottom:40,
    marginTop: 40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputViewCustom:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    height: 120,
    marginBottom:20,
    justifyContent:"center",
    padding: 20,
    paddingBottom: 0
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"70%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  loginText:{
    color:"white",
    marginTop: 10,
    marginBottom: 25
  },
  dropDownLabel:{
    color:"white",
    marginTop: -30,
    padding: 10
  },
  signUpText: {
    color:"white",
    fontSize: 24.5,
    fontWeight: 'bold',
    fontFamily: 'monospace'
  }
});