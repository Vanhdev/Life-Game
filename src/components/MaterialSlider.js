import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";

export default function MaterialSlider(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Slider minimumValue={0} maximumValue={100} value={props.value} style={styles.slider}></Slider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  slider: {
    height: 30,
    width: 150
  }
});

