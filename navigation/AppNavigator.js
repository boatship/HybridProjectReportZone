import React, { Component } from 'react';
import { View, Text,Icon } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import {Image} from 'react-native-elements'

import MapScreen from '../screens/MapScreen';
import Hub from '../screens/Hub';
import MapAdd from '../screens/MapAdd';
import AccidentsDetail from '../screens/AccidentDetail';
import NewsDetail from '../screens/NewsDetail';
import AddAccident from '../screens/AddAccident';

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
  AccidentsDetail: {screen: AccidentsDetail, navigationOptions: {

        headerCenter : (
          <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            alignContent: "center",
            width: 180,
            height: 40
          }}
          source={require("../static/large_reportzone.png")}
        />
        ),
}},
  NewsDetail: NewsDetail,
},
);

const MapAddStacking = createStackNavigator({
  MapAdd: { screen: MapAdd, navigationOptions: { header: null } },
  AddAccident: AddAccident,
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
    SETTINGS: {
      screen: MapAddStacking
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