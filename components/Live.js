import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {Foundation} from "@expo/vector-icons";
import {purple, white} from "../utils/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {calculateDirection} from "../utils/helpers";

class Live extends React.Component {
  state = {
    coords: 0,
    status: "granted",
    direction: ""
  };

  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
        .then(({status}) => {
          if (status === "granted") {
            return this.setLocation();
          }
          this.setState(() => ({status}));
        })
        .catch(error => console.warn("Error asking location permission ", error));
  };
  setLocation = () => {
    Location.watchPositionAsync(
        {
          enableHighAccuracy: true,
          timeInterval: 1,
          distanceInterval: 1
        },
        (coords) => {
          const newDirection = calculateDirection(coords.heading);
          const {direction} = this.state;
          this.setState(() => ({
            coords,
            status: "granted",
            direction: newDirection
          }));
        }
    );
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION)
        .then(({status}) => {
          if (status === "granted") {
            return this.setLocation();
          }
          this.setState(() => ({status}));
        })
        .catch(error => {
          console.warn("Error getting local permission", error);
          this.setState(() => ({status: "undetermined"}));
        });
  }

  render() {
    const {coords, status, direction} = this.state;
    if (status === null) {
      return (
          <View>
            <ActivityIndicator style={{marginTop: 30}}/>
          </View>
      );
    }
    if (status === "undetermined") {
      return (
          <View style={style.center}>
            <Foundation name={"alert"} size={50}/>
            <Text>You need to enable location services for this app</Text>
            <TouchableOpacity style={style.button} onPress={this.askPermission}>
              <Text style={style.buttonText}> Button </Text>
            </TouchableOpacity>
          </View>
      );
    }
    if (status === "denied") {
      return (
          <View style={style.center}>
            <Foundation name={"alert"} size={50}/>
            <Text>
              You denied your location. You can fix this by visiting your settings
              and enabling location services for this app.
            </Text>
          </View>
      );
    }
    return (
        <View style={style.container}>
          <View style={[style.directionContainer, {flex: 3}]}>
            <Text style={style.textHeader}>You're Heading</Text>
            <Text style={style.direction}>{direction}</Text>
          </View>
          <View style={style.metricContainer}>
            <View style={style.metric}>
              <Text style={[style.textHeader, {color: white}]}>Altitude</Text>
              <Text style={[style.subHeader, {color: white}]}>{Math.round(coords.altitude * 3.2808)} Feet</Text>
            </View>
            <View style={style.metric}>
              <Text style={[style.textHeader, {color: white}]}>Speed</Text>
              <Text style={[style.subHeader, {color: white}]}>{(coords.speed * 2.2369).toFixed(1)} MPH</Text>
            </View>
          </View>
        </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  button: {
    backgroundColor: purple,
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignSelf: "center"
  },
  buttonText: {
    color: white,
    fontSize: 20
  },
  directionContainer: {
    flex: 1,
    justifyContent: "center"
  },
  metricContainer: {
    flex: 1,
    backgroundColor: purple,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  textHeader: {
    textAlign: "center",
    fontSize: 35
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: "center"
  },
  metric: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: "center"
  },
  subHeader: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 5
  }
});
export default Live;
