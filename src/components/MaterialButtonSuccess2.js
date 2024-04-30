import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Pressable, Button } from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { products } from "../data/products";


function setDB(db, uid, data) {
  set(ref(db, 'users/' + uid), data)
    .then(() => {
      // Data saved successfully!
    })
    .catch((error) => {
      console.log(error);
    });
}

function Classes(props) {

  function JoinClass(name) {
    if (global.userInfo.classes.length == 1 && global.userInfo.classes[0] === "") global.userInfo.classes = [];
    if (global.userInfo.classes.length < 3 && !global.userInfo.classes.includes(name)) {
      if (global.userInfo.intelligence < 90) global.userInfo.intelligence += 10;
      else global.userInfo.intelligence = 100;
      var userInfo = {
        name: global.userInfo.name,
        gender: global.userInfo.gender,
        age: global.userInfo.age,
        bankBalance: global.userInfo.bankBalance,
        health: global.userInfo.health,
        intelligence: global.userInfo.intelligence,
        applyTime: global.userInfo.applyTime,
        classes: [...global.userInfo.classes, name],
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

      setModalText("Tham gia lớp học thành công!");
      setModalVisible(true);
    }
    else {

      console.log(global.userInfo.classes);
      setModalText("Tham gia lớp học không thành công!");
      setModalVisible(true);
      console.log(isModalVisible);
    }

  }

  function Class(props) {
    return (
      <Pressable style={[styles.container, { backgroundColor: "#B7E4DB" }]} onPress={() => JoinClass(props.name)}>
        <Text style={styles.joinClub}>{props.name}</Text>
      </Pressable>
    );
  }

  function handleModal() {
    setModalVisible(false);
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  if (props.visible) {
    return (
      <View style={styles.classes}>
        <Class name="Vẽ" />
        <Class name="Hát" />
        <Class name="Nhạc cụ" />
        <Class name="Toán" />
        <Class name="Văn" />
        <Class name="Anh" />
        <Modal style={{ height: 100 }} isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>{modalText}</Text>
            <Button title="OK" onPress={handleModal} />
          </View>
        </Modal>
      </View >
    );
  }
  return (
    <>

    </>
  );
}

function MaterialButtonSuccess2(props) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={[styles.container, props.style]} onPress={() => setVisible(!visible)}>
        <Text style={styles.joinClub}>Additional Classes</Text>
      </TouchableOpacity>
      <Classes visible={visible}></Classes>

    </>

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
  joinClub: {
    color: "#fff",
    fontSize: 24,
  },
  classes: {
    marginLeft: 20
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

export default MaterialButtonSuccess2;
