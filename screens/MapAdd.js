import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { WebBrowser } from 'expo';
import { Header, ListItem } from "react-native-elements";
import { Constants, MapView, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';

import marker from '../assets/images/google-marker.png'

export default class MapAdd extends React.Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    myMarker: null
  };


  componentWillMount(){
    this.props.navigation.setParams({ addAccident: this._addAccident });
  }

  _addAccident = () => {
    this.props.navigation.navigate("AddAccident", {coordinate: this.state.mapRegion});
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ myMarker: mapRegion });
  };

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
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }, myMarker: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
  };

  componentWillUnmount() {
    this._getLocationAsync.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="center"
          backgroundColor="white"

          centerComponent={<Image style={{ marginLeft: 'auto', marginRight: 'auto', alignContent: 'center', width: 180, height: 40 }} source={require('../static/large_reportzone.png')}></Image>}
          rightComponent={<Button title="Report" onPress={this.props.navigation.getParam('addAccident')} />}
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
                  style={{ alignSelf: 'stretch', height: '100%', zIndex: 100 }}
                  initialRegion={this.state.mapRegion}
                  // onRegionChange={this._handleMapRegionChange.bind(this)}
                  onRegionChangeComplete={this._handleMapRegionChange.bind(this)}
                >

                  <MapView.Marker
                    coordinate={this.state.myMarker}
                    title="My Marker"
                    description="Some description"
                    opacity={0.0}
                  />
                  <Image style={styles.marker} source={marker} />

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
  markerFixed: {

    position: 'absolute',

    margin: 'auto',
    // marginright: -27,
    // marginBottom: -45,
    zIndex: 101
  },
  marker: {
    height: 45,
    width: 27,
    left: '46.5%',
    position: 'absolute',
    top: '44%',
    margin: 'auto',
    // marginright: -27,
    // marginBottom: -45,
    zIndex: 101
  },
});

{/* <MapView.Marker draggable
  coordinate={this.state.myMarker}
  onDragEnd={(e) => this.setState({ myMarker: e.nativeEvent.coordinate })}
/> */}
{/* <MapView.Marker
  coordinate={this.state.myMarker}
  title="My Marker"
  description="Some description"
/> */}