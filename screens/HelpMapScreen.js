import React, { Component } from 'react';
import { View, Text, Button,Image } from 'react-native';
import { Card } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-gesture-handler';



class HelpMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
    title: 'Help Map'
  };

  render() {
    return (
      <View>
          <ScrollView>
        <Text style={{ marginTop: 20, marginLeft: 15, color: '#7A7A7A' }}> Perform a complete backup of your favorite manga, </Text>
        <Image
    style={{
      width: 180,
      height: 40,
      marginTop: 20, marginLeft: 15
    }}
    source={require("../static/large_reportzone.png")}
  />
        </ScrollView>
      </View>
    );
  }
}

export default HelpMapScreen;
