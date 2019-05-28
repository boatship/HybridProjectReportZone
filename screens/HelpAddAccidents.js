import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Card } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-gesture-handler';



class HelpAddAccidents extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'Help Report'
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
                        source={require("../static/HelpAddAccidents/TuNewList3.jpg")}
                    />
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpAddAccidents/TuReportView1.jpg")}
                    />
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpAddAccidents/TuReportView2.jpg")}
                    />
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpAddAccidents/TuReportForm.jpg")}
                    />
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpAddAccidents/TuPicLibraly.jpg")}
                    />
                    <Image
                        style={{
                            width: 360,
                            height: 800,
                            marginLeft: 'auto', marginRight: 'auto'
                        }}
                        source={require("../static/HelpAddAccidents/TuPicLibraly2.jpg")}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default HelpAddAccidents;
