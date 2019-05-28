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
        <View style={styles.column}>

          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reportzone.appspot.com/o/news%2F' + title + '.jpg?alt=media' }}
              style={{ width: 100, height: 100, borderRadius: 5,margin:'auto' }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>

          </View>
          <View style={{flex: 3,flexDirection: 'column'}}>
            <View style={styles.rowNoB}>
              <View style={{ flex:3,flexDirection:'column',padding: 15,paddingBottom:0 }}>
              <View style={{ flex:2,flexDirection:'row',paddingBottom:5}}>
                <Text numberOfLines={2} style={{ textAlign: 'left', fontWeight: '400' }}>
                  {title}
                </Text>
                </View>
                <View style={{ flex:1,flexDirection:'row'}}>
                <Text style={{ textAlign: 'left',fontSize:12,color:'#B4B4B4' }}>
                  {moment(date).format("Do MMM YYYY")}
                </Text>
                </View>
              </View>
            </View>

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
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: '#D8D8D8'
  },
  rowNoB: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  column: {
    flex: 1,
    flexDirection: 'column',

  },
});


export default NewsItem;