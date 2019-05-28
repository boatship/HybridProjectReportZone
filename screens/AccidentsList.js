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
import FBProvider from '../FirebaseProvider';

const extractKey = ({ inckey }) => inckey

export default class AccidentsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { accidents: [] };
    this.incRef = FBProvider.getIncidentRef('accidents');
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
    FBProvider.listenerForIncidents(this.incRef, (snap) => {
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
});
