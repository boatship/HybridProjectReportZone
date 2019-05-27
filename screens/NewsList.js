import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,Alert,Button
} from 'react-native';
import { WebBrowser,Constants, MapView, Location, Permissions,ImagePicker } from 'expo';
import { MonoText } from '../components/StyledText';
import * as firebase from 'firebase';
import NewsItem from './NewsItem'
import FBProivder from '../FirebaseProvider';
import uuid from 'uuid';

const extractKey = ({ inckey }) => inckey

export default class NewsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { news: [],
      image: null,
      uploading: false, };
    this.incRef = FBProivder.getIncidentRef('news');
  };

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

 //>>>>>>>>>>>>>>>>>>>Image Picker Image Library>>>>>>>>>>>>>>>>>>>>>>>>>
_pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        alert('Upload Complete');
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<Image Picker Image Library<<<<<<<<<<<<<<<<

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

      this.setState({ news: items });
      console.log(items)
    });
  }

  _view = (key) => {
    console.log(key)
    this.props.navigation.navigate("NewsDetail", {
      inckey: key
    });
  }

  renderItem = ({ item }) => {
    return (
      <NewsItem onPress={() => this._view(item.inckey)} item={item} />
    )
  }

  

  render() {
    let { image } = this.state;
    return (
    //<Button title="Choose image..." onPress={this.onChooseImagePress} />
      <View style={styles.container}>
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />
        <ScrollView>
          <FlatList
            style={styles.container}
            data={this.state.news}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
          />
        </ScrollView>



      </View>
    );
  }
}

//>>>>>>>>>>>>>>>>>>>>>>UploadPicture>>>>>>>>>>>>>>>>>>>>
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child("news/"+uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
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
