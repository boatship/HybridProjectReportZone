import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

class NewsItem extends Component {
  render() {
    let { title, image, date, detail } = this.props.item;
    
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="white">
        <View style={styles.row}>
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reportzone.appspot.com/o/news%2F' + title + '.jpg?alt=media' }}
              style={{ width: 50, height: 50 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text >
              {title}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'right' }}>
              {date}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
});


export default NewsItem;