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

function Products(props) {
    const setBankBalance = props.setBankBalance;

    function Buy(product) {
        if (global.userInfo.products.length == 1 && global.userInfo.products[0] === "") global.userInfo.products = [];
        if (global.userInfo.bankBalance >= product.expense) {
            global.userInfo.bankBalance -= product.expense;
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
                products: [...global.userInfo.products, product],
                relationship: global.userInfo.relationship
            };
            global.userInfo = userInfo;
            const db = getDatabase(firebaseApp)
            AsyncStorage.getItem('uid').then((uid) => {
                setDB(db, uid, userInfo);
            });

            setModalText("Mua sắm thành công!");
            setModalVisible(true);
        }
        else {
            setModalText("Bạn không đủ tiền!");
            setModalVisible(true);
        }
        setBankBalance(global.userInfo.bankBalance);
    }

    function ProductButton(props) {
        return (
            <Pressable style={[styles.container, { backgroundColor: "#B7E4DB" }]} onPress={() => Buy(props.product)}>
                <Text style={styles.joinClub}>{props.product.name}: ${props.product.expense}</Text>
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
            <ScrollView style={styles.jobView}>
                {
                    products.map(product => {
                        return (
                            <ProductButton product={product}>

                            </ProductButton>
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

function Shopping(props) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <TouchableOpacity style={[styles.container, props.style]} onPress={() => { setVisible(!visible); }}>
                <Text style={styles.joinClub}>Shopping </Text>
            </TouchableOpacity>
            <Products visible={visible} setBankBalance={props.setBankBalance}></Products>
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

export default Shopping;
