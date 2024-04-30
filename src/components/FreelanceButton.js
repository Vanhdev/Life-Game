import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button, Pressable, ScrollView } from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { freelanceJobs } from "../data/freelanceJobs";

function setDB(db, uid, data) {
    set(ref(db, 'users/' + uid), data)
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            console.log(error);
        });
}

function FreelanceJob(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    function HandleJob(job) {
        if (global.userInfo.education >= job.required.education &&
            global.userInfo.skill.includes(job.required.skill) &&
            global.userInfo.workingYear >= job.required.years) {
            var userInfo = {
                name: global.userInfo.name,
                gender: global.userInfo.gender,
                age: global.userInfo.age,
                bankBalance: (global.userInfo.bankBalance + job.salary),
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
            console.log(userInfo);
            global.userInfo = userInfo;
            const db = getDatabase(firebaseApp)
            AsyncStorage.getItem('uid').then((uid) => {
                setDB(db, uid, userInfo);
            });

            const text = "Bạn đã hoàn thành việc: " + job.name;
            setModalText(text);
            setModalVisible(true);
        }
        else {
            setModalText("Bạn chưa đủ kĩ năng cho công việc này!");
            setModalVisible(true);
        }
    }

    function JobButton(props) {
        return (
            <Pressable style={[styles.container, { backgroundColor: "#B7E4DB" }]} onPress={() => HandleJob(props.job)}>
                <Text style={styles.joinClub}>{props.job.name}</Text>
            </Pressable>
        );
    }
    function handleModal() {
        setModalVisible(false);
    }

    if (props.visible) {
        return (
            <ScrollView style={styles.jobView}>
                {
                    freelanceJobs.map(job => {
                        return (
                            <JobButton job={job}>

                            </JobButton>
                        );
                    })
                }
                <Modal style={{ height: 100 }} isVisible={isModalVisible}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <Button title="OK" onPress={handleModal} />
                    </View>
                </Modal>
            </ScrollView >
        );
    }
    return (
        <>

        </>
    );
}

function FreelanceButton(props) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <TouchableOpacity style={[styles.container, props.style]} onPress={() => { setVisible(!visible) }}>
                <Text style={styles.joinClub}>Freelance jobs </Text>
            </TouchableOpacity>
            <FreelanceJob visible={visible}></FreelanceJob>
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

export default FreelanceButton;