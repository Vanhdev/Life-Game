import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, StatusBar } from "react-native";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialButtonSuccess1 from "../components/MaterialButtonSuccess1";
import MaterialButtonSuccess5 from "../components/MaterialButtonSuccess5";
import Icon from "react-native-vector-icons/Entypo";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../configs/firebaseConfig";
import { getDatabase, ref, child, get, set } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogInScreen({ route, navigation }) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeMail(mail) {
    setEmail(mail);
  }

  function handleChangePass(pass) {
    setPassword(pass);
  }

  async function handleLogin() {
    const auth = getAuth(firebaseApp);

    try {
      var res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      try {
        await AsyncStorage.setItem('uid', res.user.uid);
      }
      catch (ex) {
        console.log(ex);
      }
      navigation.navigate("MainGameScreen")
    }
    catch (ex) {
      console.log(ex);
      setError(true);
    }
  }

  function redirectSignup() {
    navigation.navigate("Signup");
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(76,68,127,1)" />
      <View style={styles.imageStackRow}>
        <View style={styles.imageStack}>
          <Image
            source={require("../assets/images/software-programmer-cartoon-vector.jpg")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <View style={styles.logInForm}>
            <View style={styles.rect}>
              <Text style={styles.logIn}>Log In</Text>
              <Text style={styles.userName}>Email: <Text style={{ color: "red" }}>{error ? "Đăng nhập thất bại" : ""}</Text></Text>
              <MaterialUnderlineTextbox
                style={styles.materialUnderlineTextbox}
                onChange={handleChangeMail}
              ></MaterialUnderlineTextbox>
              <Text style={styles.password}>Password:</Text>
              <MaterialRightIconTextbox
                style={styles.materialRightIconTextbox}
                onChange={handleChangePass}
              ></MaterialRightIconTextbox>
              <View style={styles.materialButtonSuccess1Row}>
                <MaterialButtonSuccess1
                  style={styles.materialButtonSuccess1}
                  onPress={handleLogin}
                ></MaterialButtonSuccess1>
                <MaterialButtonSuccess5
                  style={styles.materialButtonSuccess5}
                  onPress={redirectSignup}
                ></MaterialButtonSuccess5>
              </View>
            </View>
          </View>
        </View>
        <Icon name="circle-with-cross" style={styles.icon}></Icon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(76,68,127,1)",
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 370,
    margin: "auto"
  },
  logInForm: {
    marginTop: -40,
    width: 325,
    height: 342,
    alignSelf: "center"
  },
  rect: {
    width: 325,
    height: 342,
    backgroundColor: "rgba(80,227,194,1)",
    borderRadius: 20
  },
  logIn: {
    color: "#121212",
    height: 45,
    width: 135,
    textAlign: "center",
    fontSize: 30,
    marginLeft: 89,
    zIndex: 2
  },
  userName: {
    color: "#121212",
    height: 36,
    fontSize: 16,
    marginTop: 32,
    marginLeft: 20
  },
  materialUnderlineTextbox: {
    height: 43,
    width: 290,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 11
  },
  password: {
    color: "#121212",
    height: 36,
    fontSize: 16,
    marginTop: 15,
    marginLeft: 20
  },
  materialRightIconTextbox: {
    height: 43,
    width: 290,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 11
  },
  materialButtonSuccess1: {
    height: 36,
    width: 100
  },
  materialButtonSuccess5: {
    height: 36,
    width: 100,
    marginLeft: 35
  },
  materialButtonSuccess1Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 39,
  },
  imageStack: {
    display: 'flex',
    textAlign: "center",
    margin: "auto",
    width: "100%"
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginLeft: 948,
    marginTop: 185
  },
  imageStackRow: {
    height: "100%",
    flexDirection: "row",
    flex: 1,
    display: "flex",
    alignSelf: "center",
    width: "100%"
  }
});

export default LogInScreen;
