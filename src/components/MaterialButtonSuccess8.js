import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Pressable, Button } from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../configs/firebaseConfig";
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

function Languages(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  function LearnSkill(name) {
    if (!global.userInfo.skill.includes(name)) {
      global.userInfo.skill += (name + " ");
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
      const db = getDatabase(firebaseApp)
      AsyncStorage.getItem('uid').then((uid) => {
        setDB(db, uid, userInfo);
      });
      const text = "Học thành công " + name;
      setModalText(text);
      setModalVisible(true);
    }
    else {
      const text = "Bạn đã học " + name + " từ trước";
      setModalText(text);
      setModalVisible(true);
    }
  }

  function Language(props) {
    return (
      <Pressable style={[styles.container, { backgroundColor: "#B7E4DB" }]} onPress={() => LearnSkill(props.name)}>
        <Text style={styles.joinClub}>{props.name}</Text>
      </Pressable>
    );
  }
  function handleModal() {
    setModalVisible(false);
  }

  if (props.visible) {
    return (
      <View style={styles.classes}>
        <Language name="PHP" />
        <Language name="JavaScript" />
        <Language name="Java" />
        <Language name="C#" />
        <Language name="Python" />
        <Language name="Golang" />
        <Modal style={{ height: 100 }} isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>{modalText}</Text>
            <Button title="OK" onPress={handleModal} />
          </View>
        </Modal>
      </View >

    );
  }
}

function MaterialButtonSuccess8(props) {

  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={[styles.container, props.style]} onPress={() => { setVisible(!visible) }}>
        <Text style={styles.teamWork}>Programming languages</Text>
      </TouchableOpacity>
      <Languages visible={visible} />
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
  teamWork: {
    color: "#fff",
    fontSize: 24,
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

export default MaterialButtonSuccess8;
