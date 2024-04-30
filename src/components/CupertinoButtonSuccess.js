import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonSuccess(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} disabled={props.disabled} onPress={props.onPress}>
      <Text style={styles.plus1Year}>+ 1 year</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CD964",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 7,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid"
  },
  plus1Year: {
    color: "rgba(0,0,0,1)",
    fontSize: 17,
    textAlign: "center"
  }
});

export default CupertinoButtonSuccess;
