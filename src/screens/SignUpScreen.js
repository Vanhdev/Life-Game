import React, { Component, useState } from "react";
import { StyleSheet, View, Image, Text, StatusBar } from "react-native";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialButtonSuccess1 from "../components/MaterialButtonSuccess1";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebaseConfig";

function SignUpScreen({ route, navigation }) {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeMail(mail) {
    setEmail(mail);
  }

  function handleChangePass(pass) {
    setPassword(pass);
  }

  async function handleSignup() {
    const auth = getAuth(firebaseApp);
    console.log(auth);

    try {
      var res = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Login");
    }
    catch (ex) {
      console.log(ex);
      setError(true);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(76,68,127,1)" />
      <View style={styles.imageStack}>
        <Image
          source={require("../assets/images/software-programmer-cartoon-vector.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <View style={styles.signUpForm}>
          <View style={styles.rect}>
            <Text style={styles.signUp}>Sign Up</Text>
            <Text style={styles.userName}>Email: <Text style={{ color: "red" }}>{error ? "Đăng kí thất bại" : ""}</Text></Text>
            <MaterialUnderlineTextbox
              style={styles.materialUnderlineTextbox}
              onChange={handleChangeMail}
            ></MaterialUnderlineTextbox>
            <Text style={styles.password}>Password:</Text>
            <MaterialRightIconTextbox
              style={styles.materialRightIconTextbox}
              onChange={handleChangePass}
            ></MaterialRightIconTextbox>
            <MaterialButtonSuccess1
              style={styles.materialButtonSuccess1}
              onPress={handleSignup}
            ></MaterialButtonSuccess1>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(76,68,127,1)",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 370,
    margin: "auto"
  },
  signUpForm: {
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
  signUp: {
    color: "#121212",
    height: 45,
    width: 154,
    textAlign: "center",
    fontSize: 30,
    marginLeft: 79
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
    width: 100,
    marginTop: 25,
    marginLeft: 106
  },
  imageStack: {
    display: 'flex',
    textAlign: "center",
    margin: "auto",
    width: "100%"
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgba(76,68,127,1)",
//     flexDirection: "row",
//     width: "100%",
//   },
//   image: {
//     width: "100%",
//     height: 370,
//     margin: "auto"
//     // position: "relative"
//   },
//   logInForm: {
//     marginTop: 20,
//     width: 325,
//     height: 342,
//     alignSelf: "center"
//   },
//   rect: {
//     width: 325,
//     height: 342,
//     backgroundColor: "rgba(80,227,194,1)",
//     borderRadius: 20
//   },
//   logIn: {
//     color: "#121212",
//     height: 45,
//     width: 135,
//     textAlign: "center",
//     fontSize: 30,
//     marginLeft: 89,
//     zIndex: 2
//   },
//   userName: {
//     color: "#121212",
//     height: 36,
//     width: 102,
//     fontSize: 16,
//     marginTop: 32,
//     marginLeft: 20
//   },
//   materialUnderlineTextbox: {
//     height: 43,
//     width: 290,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginLeft: 11
//   },
//   password: {
//     color: "#121212",
//     height: 36,
//     width: 102,
//     fontSize: 16,
//     marginTop: 15,
//     marginLeft: 20
//   },
//   materialRightIconTextbox: {
//     height: 43,
//     width: 290,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     marginLeft: 11
//   },
//   materialButtonSuccess1: {
//     height: 36,
//     width: 100
//   },
//   materialButtonSuccess5: {
//     height: 36,
//     width: 100,
//     marginLeft: 35
//   },
//   materialButtonSuccess1Row: {
//     height: 36,
//     flexDirection: "row",
//     marginTop: 22,
//     marginLeft: 39,
//   },
//   imageStack: {
//     // width: '100%',
//     // height: 682
//     display: 'flex',
//     textAlign: "center",
//     margin: "auto",
//     width: "100%"
//   },
//   icon: {
//     color: "rgba(128,128,128,1)",
//     fontSize: 40,
//     marginLeft: 948,
//     marginTop: 185
//   },
//   imageStackRow: {
//     height: "100%",
//     flexDirection: "row",
//     flex: 1,
//     display: "flex",
//     alignSelf: "center",
//     width: "100%"
//   }
// });

export default SignUpScreen;
