import React, { useState } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, Divider, Provider, Button, Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import TheBestToInvest from './TheBestToInvest';
import MyWatchlist from './MyWatchList';
import WhatsNew from './WhatsNew';

export default function HomeScreen({ route }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Tab = createMaterialBottomTabNavigator();

  const GeneralInvestmentSector = route.params.GeneralInvestmentSector;
  const PreferredTradingStyle = route.params.PreferredTradingStyle;
  const username = route.params.username;
  const navigation = route.params.navigation;

  return (
    <Provider>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Header
          statusBarHeight={45}
      >
      <Appbar.Content
        title="  Home"
      />
      <Appbar.Action icon="dots-vertical" onPress={openMenu} />
    </Appbar.Header>
        }
      >  
       <Menu.Item onPress={() => navigation.navigate("Welcome")} title="Logout" />
       </Menu>
    <Tab.Navigator
    initialRouteName="The Best To invest"
    activeColor="#fb5b5a"
    barStyle={{ backgroundColor: '#003f5c' }}
  >
    <Tab.Screen
      name="The Best To invest"
      children={({ navigation }) => <TheBestToInvest username={username} navigation={navigation} />}
      options={{
        tabBarLabel: 'The Best To invest',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chart-areaspline" color='dodgerblue' size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="My Watchlist"
      children={({ navigation }) => <MyWatchlist username={username} navigation={navigation} />}
      options={{
        tabBarLabel: 'My Watchlist',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="table-eye" color='dodgerblue' size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="WhatsNew"
      component={WhatsNew}
      options={{
        tabBarLabel: `What's New`,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="newspaper" color='dodgerblue' size={26} />
        ),
      }}
    />
   </Tab.Navigator>
 </Provider>
    );
}