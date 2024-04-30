import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function CupertinoSegmentWithThreeTabs(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.button}>
        <TouchableOpacity style={styles.button2} disabled={!props.schoolEnable} onPress={props.schoolPress}>
          <Text style={styles.school}>School</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentTextWrapper2} disabled={!props.jobsEnable} onPress={props.jobsPress}>
          <Text style={styles.jobs}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentTextWrapper3} onPress={props.activitiesPress}>
          <Text style={styles.activities}>Activities</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#000000"
  },
  button: {
    height: 32,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid"
  },
  button2: {
    flex: 1,
    alignItems: "center",
    padding: 6,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "rgba(80,227,194,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)"
  },
  school: {
    fontSize: 13,
    color: "rgba(0,0,0,1)"
  },
  segmentTextWrapper2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(80,227,194,1)",
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  jobs: {
    fontSize: 13,
    color: "rgba(0,0,0,1)"
  },
  segmentTextWrapper3: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(80,227,194,1)",
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  activities: {
    fontSize: 13,
    color: "rgba(0,0,0,1)"
  }
});

export default CupertinoSegmentWithThreeTabs;
