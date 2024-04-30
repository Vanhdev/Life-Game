import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MaterialToast1 from "../components/MaterialToast1";
import Banner from "../components/Banner";
import MaterialButtonSuccess2 from "../components/MaterialButtonSuccess2";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";
import MaterialButtonSuccess6 from "../components/MaterialButtonSuccess6";
import MaterialButtonSuccess7 from "../components/MaterialButtonSuccess7";
import MaterialButtonSuccess8 from "../components/MaterialButtonSuccess8";
import MaterialButtonSuccess9 from "../components/MaterialButtonSuccess9";
import MaterialButtonSuccess10 from "../components/MaterialButtonSuccess10";

function SchoolScreen1(props) {
  return (
    <View style={styles.container}>
      <View style={styles.group2Stack}>
        <View style={styles.group2}>
          <View style={styles.group1Stack}>
            <View style={styles.group1}>
              <View style={styles.rect1}>
                <View style={styles.image1Row}>
                  <Image
                    source={global.userInfo.gender === "male" ? require("../assets/images/male.png") : require("../assets/images/female.png")}
                    resizeMode="contain"
                    style={styles.image1}
                  ></Image>
                  <View style={styles.lindaEdogawa1Column}>
                    <Text style={styles.lindaEdogawa1}>Linda Edogawa</Text>
                    <Text style={styles.age1}>Age: 5</Text>
                  </View>
                  <MaterialToast1
                    style={styles.materialToast1}
                  ></MaterialToast1>
                </View>
              </View>
            </View>
            <Banner style={styles.banner}></Banner>
          </View>
          <MaterialButtonSuccess2
            style={styles.materialButtonSuccess1}
          ></MaterialButtonSuccess2>
          <MaterialButtonSuccess
            style={styles.materialButtonSuccess2}
          ></MaterialButtonSuccess>
          <MaterialButtonSuccess6
            style={styles.materialButtonSuccess6}
          ></MaterialButtonSuccess6>
          <MaterialButtonSuccess7
            style={styles.materialButtonSuccess7}
          ></MaterialButtonSuccess7>
          <MaterialButtonSuccess8
            style={styles.materialButtonSuccess8}
          ></MaterialButtonSuccess8>
        </View>
        <View style={styles.rect2}>
          <Text style={styles.wannaStudyHarder}>Wanna study harder?</Text>
          <View style={styles.materialButtonSuccess9Row}>
            <MaterialButtonSuccess9
              style={styles.materialButtonSuccess9}
            ></MaterialButtonSuccess9>
            <MaterialButtonSuccess10
              style={styles.materialButtonSuccess10}
            ></MaterialButtonSuccess10>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group2: {
    top: 0,
    left: 0,
    width: 360,
    height: 346,
    position: "absolute",
    opacity: 0.55
  },
  group1: {
    top: 0,
    width: 360,
    height: 51,
    position: "absolute",
    left: 0
  },
  rect1: {
    width: 360,
    height: 51,
    backgroundColor: "rgba(80,227,194,1)"
  },
  image1: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginTop: 5
  },
  lindaEdogawa1: {
    fontFamily: "roboto-700",
    color: "#121212"
  },
  age1: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 3
  },
  lindaEdogawa1Column: {
    width: 200,
    marginLeft: 13,
    marginTop: 5,
    marginBottom: 9
  },
  materialToast1: {
    height: 51,
    borderRadius: 57,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 28
  },
  image1Row: {
    height: 51,
    flexDirection: "row",
    marginLeft: 15
  },
  banner: {
    position: "absolute",
    top: 49,
    left: 0,
    height: 47,
    width: 360
  },
  group1Stack: {
    width: 360,
    height: 96
  },
  materialButtonSuccess1: {
    height: 50,
    width: 360
  },
  materialButtonSuccess2: {
    width: 360,
    height: 50
  },
  materialButtonSuccess6: {
    height: 50,
    width: 360
  },
  materialButtonSuccess7: {
    height: 50,
    width: 360
  },
  materialButtonSuccess8: {
    height: 50,
    width: 360
  },
  rect2: {
    top: 221,
    left: 44,
    width: 268,
    height: 249,
    position: "absolute",
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  wannaStudyHarder: {

    color: "#121212",
    height: 75,
    width: 224,
    fontSize: 20,
    marginTop: 25,
    marginLeft: 20
  },
  materialButtonSuccess9: {
    height: 36,
    width: 100
  },
  materialButtonSuccess10: {
    height: 36,
    width: 100,
    marginLeft: 15
  },
  materialButtonSuccess9Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 59,
    marginLeft: 29,
    marginRight: 24
  },
  group2Stack: {
    width: 360,
    height: 470,
    marginTop: 24
  }
});

export default SchoolScreen1;
