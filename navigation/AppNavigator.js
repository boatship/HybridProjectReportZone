import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import MapScreen from '../screens/MapScreen';
import Hub from '../screens/Hub';
import MapAdd from '../screens/MapAdd';
import AccidentsDetail from '../screens/AccidentDetail';
import NewsDetail from '../screens/NewsDetail';
import AddAccident from '../screens/AddAccident';
import HelpNews from '../screens/HelpNews';
import HelpAccidents from '../screens/HelpAccidents';
import HelpAddAccidents from '../screens/HelpAddAccidents';
import HelpMapScreen from '../screens/HelpMapScreen';
import Help from '../screens/Help';

// const AppNavigator = createStackNavigator(
//   {
//     DISCOVER: {
//       screen: Discover
//     },
//     FAVORITES: {
//       screen: Favorites
//     },
//     RECENT: {
//       screen: Recent
//     },
//     DOWNLOADS: {
//       screen: Downloads
//     },
//     MORE: {
//       screen: More
//     }
//   },
//   {
//     initialRouteName: "DISCOVER"
//   }
// );

// const MoreStacking = createStackNavigator({
//   More : More,
//   Artwork : Artwork,
//   Language : Language,
//   AdvanceSetting : AdvanceSetting,
//   BackUpRestore : BackUpRestore,
//   ManageAccount : ManageAccount
// });

const HubStacking = createStackNavigator({
  Hub: { screen: Hub, navigationOptions: { header: null } },
  AccidentsDetail: AccidentsDetail,
  NewsDetail: NewsDetail,
},
);

const MapAddStacking = createStackNavigator({
  MapAdd: { screen: MapAdd, navigationOptions: { header: null } },
  AddAccident: AddAccident,
},
);

const HelpStacking = createStackNavigator({
  Help: Help,
  HelpNews: HelpNews,
  HelpAccidents: HelpAccidents,
  HelpAddAccidents: HelpAddAccidents,
  HelpMapScreen: HelpMapScreen,
},
);

const TabNavigator = createBottomTabNavigator(
  {

    NEWS: {
      screen: HubStacking
    },
    MAP: {
      screen: MapScreen
    },
    REPORT: {
      screen: MapAddStacking
    },
    HELP: {
      screen: HelpStacking
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'MAP') {
          iconName = `md-compass`;
        } else if (routeName === 'NEWS') {
          iconName = `md-heart`;
        } else if (routeName === 'REPORT') {
          iconName = `md-alert`;
        } else if (routeName === 'HELP') {
          iconName = `md-help`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#D65D5D',
      inactiveTintColor: '#909090',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;






// import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';

// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// }));