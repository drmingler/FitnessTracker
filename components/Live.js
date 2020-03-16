import React from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import {Foundation} from '@expo/vector-icons'
import {Button} from "react-native-web";
import {purple, white} from "../utils/colors";

class Live extends React.Component {

    state = {
        coords: null,
        status: 'undetermined',
        direction: ''
    };
    askPermission = () => {

    };
    render() {
        const {coords, status, direction} = this.state;

        if (status === null) {
            return (
                <View>
                    <ActivityIndicator style={{marginTop: 30}}/>

                </View>
            )
        }
        if (status === 'undetermined') {
            return (
                <View style={style.center}>
                    <Foundation name={'alert'} size={50}/>
                    <Text>You need to enable location services for this app</Text>
                    <TouchableOpacity style={style.button} onPress={this.askPermission}>
                        <Text style={style.buttonText}> Button </Text>
                    </TouchableOpacity>

                </View>
            )
        }
        if (status === 'denied') {
            return (
                <View>
                    <Text>Denied</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text>Live</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        )

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50,
        marginRight: 50,
    },
    button: {
        backgroundColor: purple,
        padding: 10,
        margin: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
});
export default Live