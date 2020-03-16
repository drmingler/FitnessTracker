import React from 'react'
import {View, Text} from 'react-native'

class Live extends React.Component {

    state = {
        coords: null,
        status: null,
        direction: ''
    };

    render() {
        const {coords, status, direction} = this.state;
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}

export default Live