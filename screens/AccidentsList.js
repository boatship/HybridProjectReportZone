import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';
import { Constants, MapView, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';

import AccidentsItem from './AccidentsItem'
import FBProivder from '../FirebaseProvider';

const extractKey = ({ inckey }) => inckey

export default class AccidentsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { accidents: [] };
    this.incRef = FBProivder.getIncidentRef('accidents');
  };

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    // this.props.navigation.setParams({ addDetail: this._addDetail });
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this._load();
    })
    this._load();
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _load = () => {
    FBProivder.listenerForIncidents(this.incRef, (snap) => {
      var items = [];
      snap.forEach((data) => {
        items.push({
          date: data.val().date,
          title: data.val().title,
          image: data.val().image,
          detail: data.val().detail,
          inckey: data.key
        });
      });

      this.setState({ accidents: items });
      console.log(items)
    });
  }

  _view = (key) => {
    console.log(key)
    this.props.navigation.navigate("AccidentsDetail", {
      inckey: key
    });
  }

  renderItem = ({ item }) => {
    return (
      <AccidentsItem onPress={() => this._view(item.inckey)} item={item} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            style={styles.container}
            data={this.state.accidents}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
          />
        </ScrollView>



      </View>
    );
  }






}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
