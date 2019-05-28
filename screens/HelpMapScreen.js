import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
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
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpMapScreen/TuNewList2.jpg")}
                    />
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpMapScreen/TuMap.jpg")}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default HelpMapScreen;
