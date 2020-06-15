import React from "react";
import {StyleSheet, View, Text} from "react-native";
import DateHeader from "./DateHeader";
import {getMetricMetaInfo} from "../utils/helpers";
import {gray} from "../utils/colors";

export default class MetricCards extends React.Component {
    render() {
        const {date, metrics} = this.props;
        return (
            <View>
                {date && <DateHeader date={date}/>}
                {Object.keys(metrics).map(metric => {
                    const {displayName, getIcon, unit} = getMetricMetaInfo(metric);
                    return (
                        <View style={style.metric} key={metric}>
                            {getIcon()}
                            <View>
                                <Text style={{fontSize: 20}}>{displayName}</Text>
                                <Text style={{fontSize: 16, color: gray}}>
                                    {metrics[metric]} {unit}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}
const style = StyleSheet.create({
        metric: {
            flexDirection: "row",
            marginTop: 12


        }
    }
);