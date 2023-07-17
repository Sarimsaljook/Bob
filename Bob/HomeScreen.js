import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TheBestToInvest from './TheBestToInvest';
import MyWatchlist from './MyWatchList';
import WhatsNew from './WhatsNew';

export default function HomeScreen({ route }) {

  const Tab = createMaterialBottomTabNavigator();

  const GeneralInvestmentSector = route.params.GeneralInvestmentSector;
  const PreferredTradingStyle = route.params.PreferredTradingStyle;
  const username = route.params.username;

  return (
    <Tab.Navigator
    initialRouteName="The Best To invest"
    activeColor="#fb5b5a"
    barStyle={{ backgroundColor: '#003f5c' }}
  >
    <Tab.Screen
      name="The Best To invest"
      component={TheBestToInvest}
      options={{
        tabBarLabel: 'The Best To invest',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chart-areaspline" color='dodgerblue' size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="My Watchlist"
      component={MyWatchlist}
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
    );
}