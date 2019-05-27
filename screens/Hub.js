import React,{Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Constants, MapView, Location, Permissions } from 'expo';

import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import { MonoText } from '../components/StyledText';

import NewsList from "./NewsList";
import AccicentsList from "./AccidentsList";

const TabScreen = createMaterialTopTabNavigator(
  {
    "News": { screen: NewsList },
    "Accidents": { screen: AccicentsList },
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#45B4FF",
      inactiveTintColor: "#909090",
      style: {
        backgroundColor: "#FFFFFF"
      },
      labelStyle: {
        textAlign: "center"
      },
      indicatorStyle: {
        borderBottomColor: "#45B4FF",
        borderBottomWidth: 2
      }
    }
  }
);

const Hub = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#FFFFFF",
        borderBottomColor: "transparent",
        borderBottomWidth: 0,
        shadowColor: "transparent",
        elevation: 0,
        fontWeight: 'normal',
      },
      headerTintColor: "black",
      headerTitle: (<Image style={{marginLeft:'auto',marginRight:'auto',alignContent: 'center',width:180,height:40}} source={require('../static/large_reportzone.png')}></Image>),
      
    }
  }
});

export default createAppContainer(Hub);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
