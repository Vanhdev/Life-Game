import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function MaterialToast1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text numberOfLines={1} style={styles.bankBalance5}>
        Bank Balance: {props.bankBalance}$
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 288,
    justifyContent: "center",
    backgroundColor: "#323232",
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 59
  },
  bankBalance5: {
    fontSize: 14,

    color: "rgba(0,0,0,1)"
  }
});

export default MaterialToast1;
