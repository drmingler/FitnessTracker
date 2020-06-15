import React from "react";
import {View, StyleSheet} from "react-native";
import {connect} from "react-redux";
import MetricCards from "../components/MetricCards";
import {white} from "../utils/colors";
import {addEntry} from "../actions/index";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {removeEntry} from "../utils/api";
import TextButton from "./TextButton";

class EntryDetail extends React.Component {
  reset = () => {
    const {goBack, remove, entryId} = this.props;
    goBack();
    remove();
    removeEntry(entryId);
  };

  render() {
    const {metrics} = this.props;
    return (
        <View style={styles.container}>
          <MetricCards metrics={metrics}/>
          <TextButton onPress={this.reset} style={{margin: 20}}>
            RESET
          </TextButton>
        </View>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }
}

function mapStateToProps(state, {route}) {
  const {entryId} = route.params;

  return {
    entryId,
    metrics: state[entryId]
  };
}

function mapDispatchToProps(dispatch, {route, navigation}) {
  const {entryId} = route.params;
  return {
    remove: () =>
        dispatch(
            addEntry({
              [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
            })
        ),
    goBack: () => navigation.goBack()
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
