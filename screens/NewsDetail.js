import React, { Component } from "react";

import { StyleSheet, Button, View, AsyncStorage } from "react-native";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

class NewsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        newkey: new Date().valueOf().toString(),
        title: "",
        date: myFormatFunction("YYYY-MM-DD", new Date()),
        detail: "",
        image: ""
      }
    };
    this.incRef = FBProivder.getIncidentRef("news");
  }

  _load = key => {
    FBProvider.getIncidentByKey(this.incRef, key).then(data => {
      var dtparts = data.val().date.split("-");
      var tdate = new Date(dtparts[0], dtparts[1] - 1, dtparts[2]);
      var item = {
        date: tdate,
        title: data.val().title,
        detail: data.val().detail,
        image: data.val().image,
        newkey: key
      };
      console.log(item.date);
      this.setState({ value: item });
    });
  };

  //  _load = () => {
  //     FBProivder.listenerForIncidents(this.incRef, (snap) => {
  //       var items = [];
  //       snap.forEach((data) => {
  //         items.push({
  //           date: data.val().date,
  //           title: data.val().title,
  //           image: data.val().image,
  //           detail: data.val().detail,
  //           inckey: data.key
  //         });
  //       });

  //       this.setState({ news: items });
  //       console.log(items)
  //     });
  //   }

  componentWillMount() {
    this.props.navigation.setParams({ saveDetail: this._saveDetail });
    if (this.props.navigation.state.params.newkey == null) {
      console.log("MUDA MUDA MUDA MUDA MUDA !!!!!!!!!");
    } else {
      key = this.props.navigation.state.params.newkey;
      console.log(key);
      this._load(key);
    }
  }
  render() {
    return 
	<View style={styles.container} >
<ScrollView>
	{item}
</ScrollView>

	</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default NewsDetail;
