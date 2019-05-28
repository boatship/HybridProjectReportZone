import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    List,
    Flex,
    onPress
} from "react-native";
import { Header, Avatar, ListItem } from "react-native-elements";
import MaterialTabs from "react-native-material-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Image } from 'react-native-elements'

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View>

                <ScrollView>
                    <Header
                        placement="center"
                        backgroundColor="white"

                        centerComponent={<Image style={{ marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', width: 180, height: 40 }} source={require('../static/large_reportzone.png')}></Image>}
                        containerStyle={{
                            elevation: 4,
                            shadowOffset: { width: 5, height: 5 },
                            shadowColor: "grey",
                            shadowOpacity: 0.5,
                            shadowRadius: 10
                        }}
                    />
                    <SafeAreaView />

                    <View style={styles.container}>
                        <Text style={styles.textcolor}> News </Text>
                        {list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                onPress={() => this.props.navigation.navigate(item.onPress)}
                            />
                        ))}
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textcolor}> Accidents </Text>
                        {list2.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                onPress={() => this.props.navigation.navigate(item.onPress)}
                            />
                        ))}
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textcolor}> Map </Text>
                        {list3.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                onPress={() => this.props.navigation.navigate(item.onPress)}
                            />
                        ))}
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textcolor}> Report </Text>
                        {list4.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                onPress={() => this.props.navigation.navigate(item.onPress)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da"
    },
    containerFlex: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da"
    },
    textcolor: {
        marginTop: 10,
        color: "gray"
    }
});

const list = [
    {
        title: "Help News",
        icon: "book",
        onPress: 'HelpNews'
    },
];

const list2 = [
    {
        title: "Help Accidents",
        icon: "whatshot",
        onPress: 'HelpAccidents'
    },
];

const list3 = [
    {
        title: "Help Map",
        icon: "map",
        onPress: 'HelpMapScreen'
    },
];

const list4 = [
    {
        title: "Help Report",
        icon: "error",
        onPress: 'HelpAddAccidents'
    }
];
