import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button, Pressable, ScrollView } from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseApp } from "../configs/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { products } from "../data/products";

function DateView(props) {
    if (props.visible) {
        return (
            <View>
                <View style={styles.info}>
                    <Text>{ }</Text>
                </View>
            </View>
        );
    }
}

function handleDate() {
    if (global.userInfo.relationship.length == 1 && global.userInfo.relationship[0].name == "") {

    }
}

function Date(props) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TouchableOpacity style={[styles.container, props.style]} disabled={props.disabled} onPress={handleDate}>
                <Text style={styles.joinClub}>Date </Text>
            </TouchableOpacity>
            <DateView visible={visible}></DateView>
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

export default Date;
