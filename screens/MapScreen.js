import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Header, ListItem } from "react-native-elements";
import { Constants, MapView, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';
import FBProvider from '../FirebaseProvider';

const extractKey = ({ inckey }) => inckey


export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = { mapRegion: null, hasLocationPermissions: false, locationResult: null, accidents: [] };
    this.incRef = FBProvider.getIncidentRef('accidents');
  };

  componentWillMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this._getMarker();
    })
    this._getMarker();
  }

  componentDidMount() {
    this._getMarker();
    this._getLocationAsync();
  }



  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getMarker = () => {
    FBProvider.listenerForIncidents(this.incRef, (snap) => {
      var items = [];
      snap.forEach((data) => {
        items.push({
          date: data.val().date,
          title: data.val().title,
          image: data.val().image,
          detail: data.val().detail,
          latitude: data.val().latitude,
          longitude: data.val().longitude,
          inckey: data.key
        });
      });

      this.setState({ accidents: items });
      console.log(items)
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
  };

  componentWillUnmount() {
    this._getLocationAsync.remove();
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
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
        {
          this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
            this.state.hasLocationPermissions === false ?
              <Text>Location permissions are not granted.</Text> :
              this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                  style={{ alignSelf: 'stretch', height: '100%' }}
                  initialRegion={this.state.mapRegion}
                >
                  {this.state.accidents.map((marker, index) => (
                    <MapView.Marker
                      key={index}
                      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                      title={marker.title}
                      description={marker.detail}
                    />
                  ))}
                </MapView>

        }



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

{/* <MapView.Marker
  coordinate={this.state.location.coords}
  title="My Marker"
  description="Some description"
/>
  <MapView.Marker
    coordinate={{ latitude: 13.647312, longitude: 100.503083 }}
    title="My Marker"
    description="Some description"
  /> */}