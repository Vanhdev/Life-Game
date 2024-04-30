import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";

function MaterialButtonSuccess1(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={styles.join}>Join</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009688",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  join: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center"
  }
});

export default MaterialButtonSuccess1;
