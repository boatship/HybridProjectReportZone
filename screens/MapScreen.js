import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  ScrollView,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Header, ListItem } from "react-native-elements";
import { Constants, MapView, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';
import FBProvider from '../FirebaseProvider';

import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

const extractKey = ({ inckey }) => inckey

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = { mapRegion: null, hasLocationPermissions: false, locationResult: null, accidents: [], coordinate: [] };
    this.incRef = FBProvider.getIncidentRef('accidents');
  };

  componentWillMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this._getMarker();
    })
    this._getMarker();
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this._getMarker();
    this._getLocationAsync();

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.accidents.length) {
        index = this.state.accidents.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.accidents[index]
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.mapRegion.latitudeDelta,
              longitudeDelta: this.state.mapRegion.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

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
          coordinate: { latitude: data.val().latitude, longitude: data.val().longitude },
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

    const interpolations = this.state.accidents.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
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
                  ref={map => this.map = map}
                  style={{ alignSelf: 'stretch', height: '100%' }}
                  initialRegion={this.state.mapRegion}

                  showsUserLocation={true}
                >
                  {this.state.accidents.map((marker, index) => {
                    const scaleStyle = {
                      transform: [
                        {
                          scale: interpolations[index].scale,
                        },
                      ],
                    };
                    console.log(scaleStyle )
                    const opacityStyle = {
                      opacity: interpolations[index].opacity,
                    };
                    console.log(opacityStyle )
                    return (

                      <MapView.Marker
                        key={index}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.detail}
                      >
                        {/* <Animated.View style={[styles.markerWrap, opacityStyle]}>
                          <Animated.View style={[styles.ring, scaleStyle]} />
                          <View style={styles.marker} />
                        </Animated.View> */}
                      </MapView.Marker>
                    )
                  })}



                </MapView>

        }
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.accidents.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reportzone.appspot.com/o/accidents%2F' + marker.title + '.jpg?alt=media' }}
                style={styles.cardImage}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />

              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.detail}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
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