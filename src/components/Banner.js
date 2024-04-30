import React, { Component } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function Banner(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect2}>
        <View style={styles.iconRow}>
          <Pressable onPress={props.onPress}>
            <Icon name="chevron-with-circle-left" style={styles.icon}></Icon>
          </Pressable>

          <Text style={styles.school}>{props.Text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  rect2: {
    height: 50,
    backgroundColor: "rgba(74,144,226,1)",
    flexDirection: "row"
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 43,
    width: 40
  },
  school: {
    color: "rgba(255,255,255,1)",
    height: 50,
    width: 155,
    textAlign: "center",
    fontSize: 30,
    marginLeft: 56
  },
  iconRow: {
    height: 50,
    flexDirection: "row",
    flex: 1,
    marginRight: 103,
    marginLeft: 6,
    marginTop: 2
  }
});

export default Banner;
