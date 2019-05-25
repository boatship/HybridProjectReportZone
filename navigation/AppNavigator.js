import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer , createBottomTabNavigator } from 'react-navigation';

import MapScreen from '../screens/MapScreen';
import Hub from '../screens/Hub';
import SettingsScreen from '../screens/SettingsScreen';

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

const TabNavigator = createBottomTabNavigator(
  {
    
    NEWS: {
      screen: Hub
    },
    MAP: {
      screen: MapScreen
    },
    SETTINGS: {
      screen: SettingsScreen
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
        } else if (routeName === 'SETTINGS') {
          iconName = `md-time`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#45B4FF',
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