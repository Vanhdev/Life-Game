import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button, Pressable } from "react-native";
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

function Clubs(props) {
  function JoinClub(name) {
    if (global.userInfo.clubs.length == 1 && global.userInfo.clubs[0] === "") global.userInfo.clubs = [];
    if (global.userInfo.clubs.length < 3 && !global.userInfo.clubs.includes(name)) {
      var userInfo = {
        name: global.userInfo.name,
        gender: global.userInfo.gender,
        age: global.userInfo.age,
        bankBalance: global.userInfo.bankBalance,
        health: global.userInfo.health,
        intelligence: global.userInfo.intelligence,
        applyTime: global.userInfo.applyTime,
        classes: global.userInfo.classes,
        clubs: [...global.userInfo.clubs, name],
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
        console.log(userInfo);
        setDB(db, uid, userInfo);
      });
      setModalText("Tham gia câu lạc bộ thành công!");
      setModalVisible(true);
    }
    else {
      console.log(global.userInfo.clubs);
      setModalText("Tham gia câu lạc bộ không thành công!");
      setModalVisible(true);
      console.log(isModalVisible);
    }

  }

  function Club(props) {
    return (
      <Pressable style={[styles.container, { backgroundColor: "#B7E4DB" }]} onPress={() => JoinClub(props.name)}>
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
        <Club name="Bóng đá" />
        <Club name="Cờ vua" />
        <Club name="Bóng bàn" />
        <Club name="Diễn xuất" />
        <Club name="Múa" />
        <Club name="Cầu lông" />
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

function MaterialButtonSuccess(props) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={[styles.container, props.style]} onPress={() => setVisible(!visible)}>
        <Text style={styles.joinClub}>Join Club</Text>
      </TouchableOpacity>
      <Clubs visible={visible}></Clubs>
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
    textAlign: "center"
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

export default MaterialButtonSuccess;
