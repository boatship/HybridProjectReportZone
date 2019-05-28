import React, { Component } from "react";

import { StyleSheet, Button, View, AsyncStorage, Text } from "react-native";
import moment from "moment";
import { Image, Header, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import FBProvider from "../FirebaseProvider";

let myFormatFunction = (format, date) => {
  return moment(date).format(format);
};

class NewsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        inckey: new Date().valueOf().toString(),
        title: "",
        date: "",
        detail: "",
        image: ""
      }
    };
    this.incRef = FBProvider.getIncidentRef("news");
  }

  static navigationOptions = {
    //To set the header image and title for the current Screen
    //Title
    headerRight: <Image
    style={{

      right:'60%',
      width: 180,
      height: 40
    }}
    source={require("../static/large_reportzone.png")}
  />,
    //Image in Navigation Bar

  };

  _load = key => {
    FBProvider.getIncidentByKey(this.incRef, key).then(data => {
      var item = {
        date: data.val().date,
        title: data.val().title,
        detail: data.val().detail,
        image: data.val().image,
        inckey: key
      };
      console.log(item.date);
      this.setState({ value: item });
    });
  };

  //    _load = () => {
  //       FBProvider.listenerForIncidents(this.incRef, (snap) => {
  //         var item = {};
  //         snap.forEach((data) => {
  //           item.push({
  //             date: data.val().date,
  //             title: data.val().title,
  //             image: data.val().image,
  //             detail: data.val().detail,
  //             inckey: data.key
  //           });
  //         });

  //         this.setState({ value: item });
  //         console.log(item)
  //       });
  //     }

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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginTop: 20,
              marginHorizontal: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.nameHeader}>{this.state.value.title}</Text>
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/reportzone.appspot.com/o/news%2F" +
                  imagename +
                  ".jpg?alt=media"
              }}
              style={{ width: 270, height: 250,marginTop: 5 }}
            />
            <Text style={{textAlign: 'left',marginTop: 5,}}>{moment(this.state.value.date).format("MMM Do YYYY")}</Text>
            <Text style={styles.infoTypeLabel}>{this.state.value.detail}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nameHeader: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "400",
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: "left",
    color: "rgba(126,123,138,1)",
    paddingBottom: 10,
    marginTop: 5
  }
});

export default NewsDetail;
