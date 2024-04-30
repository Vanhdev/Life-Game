import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MaterialToast1 from "../components/MaterialToast1";
import Banner from "../components/Banner";
import MaterialButtonSuccess2 from "../components/MaterialButtonSuccess2";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";
import MaterialButtonSuccess6 from "../components/MaterialButtonSuccess6";
import MaterialButtonSuccess7 from "../components/MaterialButtonSuccess7";
import MaterialButtonSuccess8 from "../components/MaterialButtonSuccess8";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';


function setDB(db, uid, data) {
  set(ref(db, 'users/' + uid), data)
    .then(() => {
      // Data saved successfully!
    })
    .catch((error) => {
      console.log(error);
    });
}

function SchoolScreen({ route, navigation }) {
  function StudyHarder() {
    if (global.userInfo.intelligence <= 85) global.userInfo.intelligence += 15;
    else global.userInfo.intelligence = 100;
    var userInfo = {
      name: global.userInfo.name,
      gender: global.userInfo.gender,
      age: global.userInfo.age,
      bankBalance: global.userInfo.bankBalance,
      health: global.userInfo.health,
      intelligence: global.userInfo.intelligence,
      applyTime: global.userInfo.applyTime,
      classes: global.userInfo.classes,
      clubs: global.userInfo.clubs,
      job: global.userInfo.job,
      education: global.userInfo.education,
      skill: global.userInfo.skill,
      workingYear: global.userInfo.workingYear,
      lastLogin: global.userInfo.lastLogin,
      products: global.userInfo.products,
      relationship: global.userInfo.relationship
    };
    global.userInfo = userInfo;
    const db = getDatabase(firebaseApp)
    AsyncStorage.getItem('uid').then((uid) => {
      setDB(db, uid, userInfo);
    });
  }

  return (
    <View style={styles.container}>
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
                <Text style={styles.nameText}>{global.userInfo.name}</Text>
                <Text style={styles.ageText}>Age: {global.userInfo.age}</Text>
              </View>
              <MaterialToast1 style={styles.materialToast1} bankBalance={global.userInfo.bankBalance}></MaterialToast1>
            </View>
          </View>
        </View>
        <Banner style={styles.banner} Text="School" onPress={() => { navigation.navigate("MainGameScreen") }}></Banner>
      </View>
      <View style={styles.acitivities}>
        <MaterialButtonSuccess2
          style={styles.materialButtonSuccess1}
        ></MaterialButtonSuccess2>
        <MaterialButtonSuccess
          style={styles.materialButtonSuccess2}
        ></MaterialButtonSuccess>
        <MaterialButtonSuccess6
          style={styles.materialButtonSuccess6}
          onPress={StudyHarder}
        ></MaterialButtonSuccess6>
        {/* <MaterialButtonSuccess7
          style={styles.materialButtonSuccess7}
        ></MaterialButtonSuccess7> */}
        {global.userInfo.education == "university" &&
          <MaterialButtonSuccess8
            style={styles.materialButtonSuccess8}
          ></MaterialButtonSuccess8>
        }

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  group1: {
    top: 0,
    width: "100%",
    height: 51,
    // position: "absolute",
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
  nameText: {
    fontFamily: "roboto-700",
    color: "#121212"
  },
  ageText: {
    fontFamily: "roboto-700",
    color: "#121212",
    marginTop: 3
  },
  lindaEdogawa1Column: {
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
  image1Row: {
    height: 51,
    flexDirection: "row",
    marginLeft: 15
  },
  banner: {
    // position: "absolute",
    height: 50,
    width: "100%"
  },
  group1Stack: {
    width: "100%",
    height: 96,
  },
  acitivities: {
    width: "100%",
  },
  materialButtonSuccess1: {
    height: 50,
  },
  materialButtonSuccess2: {
    height: 50,
  },
  materialButtonSuccess6: {
    height: 50,
  },
  materialButtonSuccess7: {
    height: 50,
  },
  materialButtonSuccess8: {
    height: 50,
  }
});

export default SchoolScreen;
