import React, { Component } from "react";

import { StyleSheet, Button, View, AsyncStorage, Text } from "react-native";
import moment from "moment";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import FBProivder from "../FirebaseProvider";

class AccidentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        inckey: new Date().valueOf().toString(),
        title: "",
        date: "",
        detail: "",
        image: "",
        latitude: "",
        longitude: ""
      }
    };
    this.incRef = FBProivder.getIncidentRef("accidents");
  }

  _load = key => {
    FBProivder.getIncidentByKey(this.incRef, key).then(data => {
      var item = {
        date: data.val().date,
        title: data.val().title,
        detail: data.val().detail,
        image: data.val().image,
        latitude: date.val().latitude,
        longitude: data.val().longitude,
        inckey: key
      };
      console.log(item.date);
      this.setState({ value: item });
    });
  };

  componentWillMount() {
    this.props.navigation.setParams({ saveDetail: this._saveDetail });
    if (this.props.navigation.state.params.inckey == null) {
      console.log("MUDA MUDA MUDA MUDA MUDA !!!!!!!!!");
    } else {
      key = this.props.navigation.state.params.inckey;
      console.log(key);
      this._load(key);
    }
  }

  render() {
    let imagename = this.state.value.title;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{this.state.value.title}</Text>
          <Text>{this.state.value.detail}</Text>
          <Text>{this.state.value.date}</Text>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reportzone.appspot.com/o/accidents%2F' + imagename + '.jpg?alt=media' }}
            style={{ width: 100, height: 100 }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AccidentDetail;
