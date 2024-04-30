import React, { Component, useState } from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialRightIconTextbox(props) {
  const [visible, setVisible] = useState(true);
  return (
    <View style={[styles.container, props.style]}>
      <TextInput secureTextEntry={visible}
        placeholder="Password"
        style={styles.inputStyle}
        onChangeText={props.onChange}></TextInput>
      <Pressable onPress={() => setVisible(!visible)}>
        <Icon name="eye" style={styles.iconStyle}></Icon>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 16,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    left: 0,
    width: 343,
    top: 0,
    height: 42,
    paddingLeft: 20
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingRight: 8
  }
});

export default MaterialRightIconTextbox;
