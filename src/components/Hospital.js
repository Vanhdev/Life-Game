import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button, Pressable, ScrollView } from "react-native";
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

function Hospital(props) {
    const [modalText, setModalText] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalChoiceVisible, setModalChoiceVisible] = useState(false);

    function healthCare() {
        if (global.userInfo.bankBalance >= 200) {
            setModalText("Bạn có chắn chắn muốn chăm sóc sức khỏe không?")
            setModalChoiceVisible(true);
        }
        else {
            setModalText("Bạn không đủ tiền");
            setModalVisible(true);
        }
    }

    function handleYes() {
        global.userInfo.bankBalance -= 200;
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
        setModalText("Chăm sóc sức khỏe thành công!");
        setModalVisible(true);
        setModalChoiceVisible(false);
    }

    function handleNo() {
        setModalChoiceVisible(false);
    }

    function handleModal() {
        setModalVisible(false);
    }

    return (
        <>
            <TouchableOpacity style={[styles.container, props.style]} disabled={props.disabled} onPress={healthCare}>
                <Text style={styles.joinClub}>Health care: $200</Text>
            </TouchableOpacity>
            <Modal style={{ height: 100 }} isVisible={isModalVisible}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>{modalText}</Text>
                    <Button title="OK" onPress={handleModal} />
                </View>
            </Modal>
            <Modal style={{ height: 100 }} isVisible={isModalChoiceVisible}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>{modalText}</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <Button style={{ width: 100, height: 50 }} title="Có" onPress={handleYes} />
                        <Button title="Ko" onPress={handleNo} />
                    </View>
                </View>
            </Modal>
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
    jobView: {
        height: 300
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

export default Hospital;
