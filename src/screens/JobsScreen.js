import React, { Component, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MaterialToast1 from "../components/MaterialToast1";
import Banner from "../components/Banner";
import LongTermButton from "../components/LongTermButton";
import FreelanceButton from "../components/FreelanceButton";

function JobsScreen({ route, navigation }) {
    const [bankBalance, setBankBalance] = useState(global.userInfo.bankBalance)
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
                <Banner style={styles.banner} Text="Jobs" onPress={() => { navigation.navigate("MainGameScreen") }}></Banner>
            </View>
            <View style={styles.acitivities}>
                <LongTermButton
                    style={styles.materialButtonSuccess1}
                ></LongTermButton>
                <FreelanceButton
                    setBankBalance={setBankBalance}
                    style={styles.materialButtonSuccess1}
                >

                </FreelanceButton>
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

export default JobsScreen;
