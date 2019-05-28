import React, { Component } from "react";

import { StyleSheet, Button, View, AsyncStorage,Text } from "react-native";
import moment from "moment";
import { Image } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import FBProvider from '../FirebaseProvider';


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
    let imagename = this.state.value.title
    return(
	      <View style={styles.container} >
          <ScrollView>
	          <Text>{this.state.value.title}</Text>
            <Text>{this.state.value.detail}</Text>
            <Text>{this.state.value.date}</Text>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reportzone.appspot.com/o/news%2F' + imagename + '.jpg?alt=media' }}
              style={{ width: 100, height: 100 }}
            />
            </ScrollView>
	        </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default NewsDetail;
