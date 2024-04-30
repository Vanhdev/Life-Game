import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  ScrollView
} from "react-native";
import MaterialToast1 from "../components/MaterialToast1";
import MaterialSlider from "../components/MaterialSlider";
import CupertinoButtonSuccess from "../components/CupertinoButtonSuccess";
import CupertinoSegmentWithThreeTabs from "../components/CupertinoSegmentWithThreeTabs";
import MaterialButtonSuccess2 from "../components/MaterialButtonSuccess2";

function MainGameScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.group6}>
        <View style={styles.rect}>
          <View style={styles.imageRow}>
            <Image
              source={global.userInfo.gender === "male" ? require("../assets/images/male.png") : require("../assets/images/female.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <View style={styles.lindaEdogawa1Column}>
              <Text style={styles.lindaEdogawa1}>Linda Edogawa</Text>
              <Text style={styles.age5}>Age: 5</Text>
            </View>
            <MaterialToast1 style={styles.materialToast1}></MaterialToast1>
          </View>
        </View>
      </View>
      <View style={styles.rate}>
        <View style={styles.rect2}>
          <View style={styles.healthRate}>
            <View style={styles.healthRow}>
              <Text style={styles.health}>Health</Text>
              <MaterialSlider style={styles.materialSlider3}></MaterialSlider>
            </View>
          </View>
          <View style={styles.smartRate}>
            <Text style={styles.intelligence}>Intelligence</Text>
            <View style={styles.intelligenceFiller}></View>
            <MaterialSlider style={styles.materialSlider}></MaterialSlider>
          </View>
        </View>
      </View>
      <CupertinoButtonSuccess
        style={styles.cupertinoButtonSuccess}
      ></CupertinoButtonSuccess>
      <CupertinoSegmentWithThreeTabs
        style={styles.cupertinoSegmentWithThreeTabs}
      ></CupertinoSegmentWithThreeTabs>
      <View style={styles.decisionArea}>
        <View style={styles.scrollArea}>
          <ScrollView
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <Text style={styles.loremIpsum7}>
              Lorem Ipsum dnjfsijf jndijsni dnfjsidnisnf ndjasndsj dkjnsdjasn
              ndjasndasjdn njsandsjnn indjsdnd njsndjsnd njsjn?
            </Text>
            <MaterialButtonSuccess2
              style={styles.materialButtonSuccess2}
            ></MaterialButtonSuccess2>
            <MaterialButtonSuccess2
              style={styles.materialButtonSuccess}
            ></MaterialButtonSuccess2>
            <MaterialButtonSuccess2
              style={styles.materialButtonSuccess1}
            ></MaterialButtonSuccess2>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group6: {
    width: 360,
    height: 51,
    marginTop: 24
  },
  rect: {
    width: 360,
    height: 51,
    backgroundColor: "rgba(80,227,194,1)"
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginTop: 5
  },
  lindaEdogawa1: {
    fontFamily: "roboto-700",
    color: "#121212"
  },
  age5: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 3
  },
  lindaEdogawa1Column: {
    width: 95,
    marginLeft: 13,
    marginTop: 5,
    marginBottom: 9
  },
  materialToast1: {
    width: 173,
    height: 51,
    borderRadius: 57,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 28
  },
  imageRow: {
    height: 51,
    flexDirection: "row",
    marginLeft: 15
  },
  rate: {
    width: 360,
    height: 122,
    marginTop: 530
  },
  rect2: {
    width: 360,
    height: 122,
    backgroundColor: "#E6E6E6"
  },
  healthRate: {
    width: 284,
    height: 44,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 36
  },
  health: {

    color: "#121212",
    marginTop: 13
  },
  materialSlider3: {
    height: 44,
    width: 156,
    marginLeft: 84
  },
  healthRow: {
    height: 44,
    flexDirection: "row",
    flex: 1
  },
  smartRate: {
    width: 284,
    height: 51,
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 36
  },
  intelligence: {

    color: "#121212",
    marginTop: 9
  },
  intelligenceFiller: {
    flex: 1,
    flexDirection: "row"
  },
  materialSlider: {
    height: 51,
    width: 156
  },
  cupertinoButtonSuccess: {
    height: 44,
    width: 100,
    backgroundColor: "rgba(80,227,194,1)",
    overflow: "visible",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 120,
    shadowOpacity: 0.74,
    shadowRadius: 40,
    marginTop: -252,
    marginLeft: 130
  },
  cupertinoSegmentWithThreeTabs: {
    height: 56,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 12
  },
  decisionArea: {
    width: 330,
    height: 357,
    marginTop: -490,
    marginLeft: 15
  },
  scrollArea: {
    width: 330,
    height: 357,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 37,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 60,
    shadowOpacity: 0.65,
    shadowRadius: 20
  },
  scrollArea_contentContainerStyle: {
    height: 357,
    width: 330
  },
  loremIpsum7: {

    color: "#121212",
    height: 55,
    width: 284,
    marginTop: 24,
    marginLeft: 21
  },
  materialButtonSuccess2: {
    height: 44,
    width: 268,
    borderRadius: 16,
    marginTop: 38,
    marginLeft: 29
  },
  materialButtonSuccess: {
    height: 44,
    width: 268,
    borderRadius: 16,
    marginTop: 18,
    marginLeft: 29
  },
  materialButtonSuccess1: {
    height: 44,
    width: 268,
    borderRadius: 16,
    marginTop: 18,
    marginLeft: 31
  }
});

export default MainGameScreen;
