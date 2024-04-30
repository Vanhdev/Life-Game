import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Image, Text, Button, Pressable } from "react-native";
import MaterialToast1 from "../components/MaterialToast1";
import MaterialSlider from "../components/MaterialSlider";
import CupertinoButtonSuccess from "../components/CupertinoButtonSuccess";
import CupertinoSegmentWithThreeTabs from "../components/CupertinoSegmentWithThreeTabs";
import Svg, { Ellipse } from "react-native-svg";
import { RandonName } from "../data/FamilyName";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Modal from "react-native-modal";
import { death, diseases } from "../data/suddenDeath";

function MainGameScreen1({ route, navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [schoolEnable, setSchoolEnable] = useState(false);
  const [jobsEnable, setJobsEnable] = useState(false);
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isModalGraduateVisible, setModalGraduateVisible] = useState(false);
  const [isResetVisible, setResetVisible] = useState(false);

  function setDB(db, uid, data) {
    set(ref(db, 'users/' + uid), data)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const db = getDatabase(firebaseApp)
    const dbRef = ref(db);
    const date = new Date();
    if (isFocused) {
      AsyncStorage.getItem('uid').then((uid) => {
        get(child(dbRef, `users/${uid}/`)).then((snapshot) => {
          if (snapshot.exists()) {
            global.userInfo = snapshot.val();
            if (global.userInfo.lastLogin != date.toLocaleDateString()) {
              global.userInfo.bankBalance += 5;
              if (global.userInfo.health < 100) global.userInfo.health += 1;

              global.userInfo.lastLogin = date.toLocaleDateString();
              setUserInfo({
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
                lastLogin: date.toLocaleDateString(),
                products: global.userInfo.products,
                relationship: global.userInfo.relationship
              });

              setDB(db, uid, global.userInfo);
            }

            setUserInfo(global.userInfo);

            if (global.userInfo.age >= 6) {
              setSchoolEnable(true);
            }
            if (global.userInfo.age >= 18) {
              setJobsEnable(true);
            }
          }
          else {
            const gender = Math.floor(Math.random() * 2) == 1 ? "male" : "female";

            global.userInfo = {
              name: RandonName(gender),
              gender: gender,
              age: 1,
              bankBalance: 0,
              health: 50,
              intelligence: 20,
              applyTime: 0,
              classes: [""],
              clubs: [""],
              job: { name: "" },
              education: 0,
              skill: "",
              workingYear: 0,
              lastLogin: date.toLocaleDateString(),
              products: "",
              relationship: [
                { name: "", age: 0, type: "" }
              ]
            };
            setUserInfo(global.userInfo);
            setDB(db, uid, global.userInfo);
          }
        }).catch((error) => {
          console.error(error);
        });
      });
    }
  }, [isFocused])

  const [disabled, setDisabled] = useState(false);

  function handlePlusYearsOld() {
    if (userInfo.age >= 12) {
      const random1 = Math.floor(Math.random() * 1000000000);
      const random2 = Math.floor(Math.random() * 1000000000);
      if (random1 == random2) {
        const reason = death[Math.floor(Math.random() * death.length)];
        const text = "Bạn đã bị chết do " + reason;
        setModalText(text);
        setResetVisible(true);
        return;
      }

      const random3 = Math.floor(Math.random() * 1000000000);

      const random4 = Math.floor(Math.random() * 1000000000);
      if (random3 == random4) {
        console.log(random3);
        const reason = diseases[Math.floor(Math.random() * diseases.length)];
        userInfo.health -= reason.harm;
        if (userInfo.health > 0) {
          const text = "Bạn đã bị " + reason.name;
          setModalText(text);
          setModalGraduateVisible(true);
        }
      }
    }

    if (userInfo.health <= 0) {
      const text = "Bạn đã bị chết";
      setModalText(text);
      setResetVisible(true);
      return;
    }
    setDisabled(true);
    userInfo.age += 1;
    if (userInfo.age == 6) userInfo.education = 1;
    if (userInfo.age == 11) userInfo.education = 2;
    if (userInfo.age == 15) userInfo.education = 3;
    if (userInfo.age == 18) {
      userInfo.bankBalance += 10000;
      setModalText("Bạn có muốn học đại học không?");
      setModalVisible(true);
    }

    if (userInfo.age == 23 && userInfo.education === 4) {
      userInfo.education = 5;
      setModalText("Bạn đã hoàn thành chương trình đại học");
      setModalGraduateVisible(true);
    }

    console.log(userInfo.job.name);

    if (userInfo.job.name !== "") {
      userInfo.bankBalance += (userInfo.job.salary * 12);
      userInfo.workingYear += 1;
      console.log(userInfo);
      if (userInfo.job.harm != undefined) userInfo.health -= userInfo.job.harm;
    }
    setUserInfo({
      name: userInfo.name,
      gender: userInfo.gender,
      age: userInfo.age,
      bankBalance: userInfo.bankBalance,
      health: userInfo.health,
      intelligence: userInfo.intelligence,
      applyTime: userInfo.applyTime,
      classes: userInfo.classes,
      clubs: userInfo.clubs,
      job: userInfo.job,
      education: userInfo.education,
      skill: userInfo.skill,
      workingYear: userInfo.workingYear,
      lastLogin: userInfo.lastLogin,
      products: userInfo.products,
      relationship: userInfo.relationship
    });

    global.userInfo = userInfo;

    if (userInfo.age >= 6) {
      setSchoolEnable(true);
    }
    if (userInfo.age >= 18) {
      setJobsEnable(true);
    }

    const db = getDatabase(firebaseApp)
    AsyncStorage.getItem('uid').then((uid) => {
      setDB(db, uid, userInfo);
    });

    setDisabled(false);
  }

  function handleYesModal() {
    userInfo.education = 4
    setUserInfo({
      name: userInfo.name,
      gender: userInfo.gender,
      age: userInfo.age,
      bankBalance: userInfo.bankBalance,
      health: userInfo.health,
      intelligence: userInfo.intelligence,
      applyTime: userInfo.applyTime,
      classes: userInfo.classes,
      clubs: userInfo.clubs,
      job: userInfo.clubs,
      education: userInfo.education,
      skill: userInfo.skill,
      workingYear: userInfo.workingYear,
      lastLogin: userInfo.lastLogin,
      products: userInfo.products,
      relationship: userInfo.relationship
    });
    const db = getDatabase(firebaseApp)
    AsyncStorage.getItem('uid').then((uid) => {
      setDB(db, uid, userInfo);
    });
    setModalVisible(false);
  }
  function handleNoModal() {
    setModalVisible(false);
  }
  function hideModal() {
    setModalGraduateVisible(false);
  }

  function Reset() {
    const gender = Math.floor(Math.random() * 2) == 1 ? "male" : "female";
    const date = new Date();
    global.userInfo = {
      name: RandonName(gender),
      gender: gender,
      age: 1,
      bankBalance: 0,
      health: 50,
      intelligence: 20,
      applyTime: 0,
      classes: [""],
      clubs: [""],
      job: { name: "" },
      education: 0,
      skill: "",
      workingYear: 0,
      lastLogin: date.toLocaleDateString(),
      products: "",
      relationship: [
        { name: "", age: 0, type: "" }
      ]
    };
    setUserInfo(global.userInfo);
    const db = getDatabase(firebaseApp)
    AsyncStorage.getItem('uid').then((uid) => {
      console.log(uid);
      setDB(db, uid, userInfo);
    });
    setResetVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.group6}>
        <View style={styles.rect}>
          <View style={styles.imageRow}>
            <Image
              source={userInfo.gender === "male" ? require("../assets/images/male.png") : require("../assets/images/female.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <View style={styles.infoCol}>
              <Text style={styles.nameInfo}>{userInfo.name}</Text>
              <Text style={styles.ageInfo}>Age: {userInfo.age}</Text>
            </View>
            <MaterialToast1 style={styles.materialToast1} bankBalance={userInfo.bankBalance}></MaterialToast1>
          </View>
        </View>
      </View>
      <View style={styles.rate}>
        <View style={styles.rect2}>
          <View style={styles.healthRate}>
            <View style={styles.healthRow}>
              <Text style={styles.health}>Health</Text>
              <MaterialSlider style={styles.materialSlider3} value={userInfo.health}></MaterialSlider>
              <Text style={styles.health}>{userInfo.health}</Text>
            </View>
          </View>
          <View style={styles.smartRate}>
            <Text style={styles.intelligence}>Intelligence</Text>
            <View style={styles.intelligenceFiller}></View>
            <MaterialSlider style={styles.materialSlider} value={userInfo.intelligence}></MaterialSlider>
            <Text style={styles.intelligence}>{userInfo.intelligence}</Text>
          </View>
        </View>
      </View>
      <CupertinoButtonSuccess
        disabled={disabled}
        style={styles.cupertinoButtonSuccess}
        onPress={handlePlusYearsOld}
      ></CupertinoButtonSuccess>
      <CupertinoSegmentWithThreeTabs
        style={styles.cupertinoSegmentWithThreeTabs}
        schoolEnable={schoolEnable}
        schoolPress={() => { navigation.navigate("SchoolScreen"); }}
        jobsEnable={jobsEnable}
        jobsPress={() => { navigation.navigate("JobsScreen"); }}
        activitiesPress={() => { navigation.navigate("ActivitiesScreen"); }}
      ></CupertinoSegmentWithThreeTabs>
      <View style={styles.age}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 278.61 278.57" style={styles.ellipse}>
            <Ellipse
              strokeWidth={0}
              fill="rgba(80,227,194,1)"
              cx={139}
              cy={139}
              rx={139}
              ry={139}
            ></Ellipse>
          </Svg>
          <Svg viewBox="0 0 246.29 246.2" style={styles.ellipse2}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(255,255,255,1)"
              cx={123}
              cy={123}
              rx={123}
              ry={123}
            ></Ellipse>
          </Svg>
          <Text style={styles.loremIpsum}>{userInfo.age}</Text>
        </View>
      </View>
      <Modal style={{ height: 100 }} isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{modalText}</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <Button style={{ width: 100, height: 50 }} title="Có" onPress={handleYesModal} />
            <Button title="Ko" onPress={handleNoModal} />
          </View>
        </View>
      </Modal>
      <Modal style={{ height: 100 }} isVisible={isModalGraduateVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{modalText}</Text>
          <Button title="OK" onPress={hideModal} />
        </View>
      </Modal>
      <Modal style={{ height: 100 }} isVisible={isResetVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{modalText}</Text>
          <Button title="Reset" onPress={Reset} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  group6: {
    width: "100%",
    height: 51
  },
  rect: {
    width: "100%",
    height: 51,
    backgroundColor: "rgba(80,227,194,1)"
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginTop: 5
  },
  nameInfo: {
    color: "#121212"
  },
  ageInfo: {
    color: "#121212",
    marginTop: 3
  },
  infoCol: {
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
    width: "100%",
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
    height: 44,
    width: 156,
    marginLeft: 52
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
  age: {
    width: 279,
    height: 279,
    marginTop: -459,
    marginLeft: 41
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 279,
    height: 279,
    position: "absolute"
  },
  ellipse2: {
    top: 16,
    left: 16,
    width: 246,
    height: 246,
    position: "absolute"
  },
  loremIpsum: {
    top: 92,
    position: "absolute",
    color: "#121212",
    height: 97,
    width: 141,
    fontSize: 70,
    textAlign: "center",
    left: 69
  },
  ellipseStack: {
    width: 279,
    height: 279
  },
  modal: {
    flex: 1,
    height: 20,
    justifyContent: "center"
  },
  modalText: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 50,
    textAlign: "center"
  }
});

export default MainGameScreen1;
