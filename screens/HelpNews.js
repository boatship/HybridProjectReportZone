import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Card } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-gesture-handler';



class HelpNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'Help News'
    };

    render() {
        return (
            <View>
                <ScrollView>
                    <Image
                        style={{
                            width: 180,
                            height: 40,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/large_reportzone.png")}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default HelpNews;
