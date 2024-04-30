import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Image, Text, Button, Pressable } from "react-native";
import MaterialToast1 from "../components/MaterialToast1";
import Banner from "../components/Banner";
import { useIsFocused } from "@react-navigation/native";
import { RandonName } from "../data/FamilyName";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../configs/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { collection } from "firebase/firestore";

function setDB(db, uid, data) {
    set(ref(db, 'users/' + uid), data)
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            console.log(error);
        });
}

function DateScreen({ route, navigation }) {
    const [bankBalance, setBankBalance] = useState(global.userInfo.bankBalance);
    const [userInfo, setUserInfo] = useState({});
    const [darling, setDarling] = useState({});
    const [isVisible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const isFocused = useIsFocused();

    console.log("OK");
    useEffect(() => {
        if (isFocused) {
            if (global.userInfo.relationship.length == 1 && global.userInfo.relationship[0].name == "") {
                global.userInfo.relationship = [];

                var age = global.userInfo.age;
                var minAge = age - 7;
                if (minAge < 18) minAge = 18;
                var maxAge = age + 7;

                const randomAge = Math.floor(Math.random() * (maxAge - minAge)) + minAge;
                const gender = (global.userInfo.gender == "male") ? "female" : "male";
                const name = RandonName(gender);

                setDarling({ name: name, age: randomAge, happiness: 50, type: "girl-friend" });
                setVisible(true);
            }
            else {
                setDarling(global.userInfo.relationship[0]);
            }
        }
    }, [isFocused]);

    function handleAccept() {
        global.userInfo.relationship.push(darling);
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
            lastLogin: global.userInfo.lastLogin,
            products: global.userInfo.products,
            relationship: global.userInfo.relationship
        });
        const db = getDatabase(firebaseApp)
        AsyncStorage.getItem('uid').then((uid) => {
            setDB(db, uid, global.userInfo);
        });
        setVisible(false);
    }

    function handleReject() {
        var age = global.userInfo.age;
        var minAge = age - 7;
        if (minAge < 18) minAge = 18;
        var maxAge = age + 7;

        const randomAge = Math.floor(Math.random() * (maxAge - minAge)) + minAge;
        const gender = (global.userInfo.gender == "male") ? "female" : "male";
        const name = RandonName(gender);

        setDarling({ name: name, age: randomAge, happiness: 50, type: "date" });
        setVisible(true);
    }

    function handleRaiseHappiness() {
        darling.happiness += 10;
        setDarling(darling);
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
            lastLogin: global.userInfo.lastLogin,
            products: global.userInfo.products,
            relationship: [darling]
        });
        const db = getDatabase(firebaseApp)
        AsyncStorage.getItem('uid').then((uid) => {
            setDB(db, uid, global.userInfo);
        });
        setModalText("Mức độ vui vẻ đã tăng lên");
        setModalVisible(true);
    }

    function handleGift() {
        const randomExpense = Math.floor(Math.random() * 100) + 200;
        if (global.userInfo.bankBalance < randomExpense) {
            setModalText("Bạn không đủ tiền");
            setModalVisible(true);
            return;
        }
        setBankBalance(global.userInfo.bankBalance - randomExpense);
        darling.happiness += 10;
        setDarling(darling);
        setUserInfo({
            name: global.userInfo.name,
            gender: global.userInfo.gender,
            age: global.userInfo.age,
            bankBalance: (global.userInfo.bankBalance - randomExpense),
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
            relationship: [darling]
        });
        const db = getDatabase(firebaseApp)
        AsyncStorage.getItem('uid').then((uid) => {
            setDB(db, uid, global.userInfo);
        });
        setModalText("Mức độ vui vẻ đã tăng lên");
        setModalVisible(true);
    }

    function handleHide() {
        setModalVisible(false);
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
                            <MaterialToast1 style={styles.materialToast1} bankBalance={bankBalance}></MaterialToast1>
                        </View>
                    </View>
                </View>
                <Banner style={styles.banner} Text="Dating" onPress={() => { navigation.navigate("MainGameScreen") }}></Banner>
            </View>
            <View style={styles.acitivities}>
                <View style={styles.infoRow}>
                    <View style={styles.info}>
                        <Text style={styles.text}>{darling.name}</Text>
                        <Text style={styles.text}>{darling.age}</Text>
                    </View>
                    <Text style={styles.text}>Hạnh phúc: {darling.happiness}</Text>
                </View>
                <Pressable style={[styles.button, { backgroundColor: "#B7E4DB" }]} onPress={handleRaiseHappiness}>
                    <Text style={styles.buttonText}>Trò chuyện</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: "#B7E4DB" }]} onPress={handleGift}>
                    <Text style={styles.buttonText}>Tặng quà ($200- $300)</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: "#B7E4DB" }]} onPress={handleRaiseHappiness}>
                    <Text style={styles.buttonText}>Đi chơi</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: "#B7E4DB" }]} onPress={handleRaiseHappiness}>
                    <Text style={styles.buttonText}>Khen ngợi</Text>
                </Pressable>

            </View>
            <Modal style={{ height: 100 }} isVisible={isVisible}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Bạn có muốn hẹn hò với</Text>
                    <Text style={styles.modalText}>{darling.name} {darling.age} tuổi</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <Button style={{ width: 100, height: 50 }} title="Yes" onPress={handleAccept} />
                        <Button title="No" onPress={handleReject} />
                    </View>
                </View>
            </Modal>
            <Modal style={{ height: 100 }} isVisible={isModalVisible}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>{modalText}</Text>
                    <Button title="OK" onPress={handleHide} />
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
    },
    infoRow: {
        display: "flex",
        flexDirection: "row",
        gap: 160,
        marginTop: 10,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    text: {
        fontSize: 15,
        color: "#EA86B5",
        textAlign: "center"
    },
    button: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "#fff",
        textAlign: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        marginTop: 10
    }
});

export default DateScreen;
