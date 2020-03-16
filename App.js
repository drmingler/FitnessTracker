import React from "react";
import {View, Platform} from "react-native";
import AddEntry from "./components/AddEntry";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {purple, white} from "./utils/colors";
import {StatusBar} from "react-native";
import Constants from "expo-constants";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";
import {setLocalNotification} from './utils/helpers';

function MyStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const Stack = createStackNavigator();

function MyStack() {
  const header = Platform.OS === "ios";

  return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: white
            },
            headerShown: header
          }}
      >
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen
            name="Details"
            component={EntryDetail}
            options={({route}) => {
              const {entryId} = route.params;
              const year = entryId.slice(0, 4);
              const month = entryId.slice(5, 7);
              const day = entryId.slice(8);

              return {headerShown: true, title: `${month}/${day}/${year}`};
            }}
        />
      </Stack.Navigator>
  );
}


export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        const Tab =
            Platform.OS === "ios"
                ? createBottomTabNavigator()
                : createMaterialTopTabNavigator();
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <MyStatusBar backgroundColor={purple} barStyle={"light-content"}/>
                    <NavigationContainer>
                        <Tab.Navigator
                  screenOptions={({route}) => ({
                    tabBarIcon: ({color, size}) => {
                      let icon;

                      if (route.name === "Add Entry") {
                        icon = (
                            <FontAwesome
                                name="plus-square"
                                size={size}
                                color={color}
                            />
                        );
                      } else if (route.name === "History") {
                        icon = (
                            <Ionicons
                                name="ios-bookmarks"
                                size={size}
                                color={color}
                            />
                        );
                      } else if (route.name === "Live") {
                        icon = (
                            <Ionicons
                                name="ios-speedometer"
                                size={size}
                                color={color}
                            />
                        );
                      }
                      return icon;
                    }
                  })}
                  tabBarOptions={{
                    activeTintColor: Platform.OS === "ios" ? purple : white,
                    style: {
                      height: 56,
                      backgroundColor: Platform.OS === "ios" ? white : purple,
                      shadowColor: "rgba(0, 0, 0, 0.24)",
                      paddingBottom: 10,
                      paddingTop: 7,

                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 6,
                      shadowOpacity: 1
                    }
                  }}
              >
                <Tab.Screen name="History" component={MyStack}/>
                <Tab.Screen name="Add Entry" component={AddEntry}/>
                <Tab.Screen name="Live" component={Live}/>
              </Tab.Navigator>
            </NavigationContainer>
          </View>
        </Provider>
    );
  }
}
