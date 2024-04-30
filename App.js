import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainGameScreen from './src/screens/MainGameScreen';
import MainGameScreen1 from './src/screens/MainGameScreen1';
import SchoolScreen from './src/screens/SchoolScreen';
import SchoolScreen1 from './src/screens/SchoolScreen1';
import JobsScreen from './src/screens/JobsScreen';
import ActivitiessScreen from './src/screens/ActivityScreen';
import DateScreen from './src/screens/DateScreen';

const Stack = createNativeStackNavigator();

export default App = () => {
  const [userInfo, setUserInfo] = useState(undefined);
  const DataContext = createContext({ userInfo, setUserInfo });
  return (
    <DataContext.Provider value={{ userInfo, setUserInfo }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="Login"
            component={LogInScreen}
          />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="MainGameScreen" component={MainGameScreen1} />
          <Stack.Screen name="ActivitiesScreen" component={ActivitiessScreen} />
          <Stack.Screen name="SchoolScreen" component={SchoolScreen} />
          <Stack.Screen name="JobsScreen" component={JobsScreen} />
          <Stack.Screen name="DateScreen" component={DateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
}


// const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
//   return (
//     <View style={styles.authContainer}>
//       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//       />
//       <View style={styles.buttonContainer}>
//         <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
//       </View>

//       <View style={styles.bottomContainer}>
//         <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
//         </Text>
//       </View>
//     </View>
//   );
// }


// const AuthenticatedScreen = ({ user, handleAuthentication }) => {
//   return (
//     <View style={styles.authContainer}>
//       <Text style={styles.title}>Welcome</Text>
//       <Text style={styles.emailText}>{user.email}</Text>
//       <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
//     </View>
//   );
// };
// export default App = () => {

//   const [user, setUser] = useState(null); // Track user authentication state
//   const [isLogin, setIsLogin] = useState(true);

//   const auth = getAuth(app);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, [auth]);


//   const handleAuthentication = async () => {
//     try {
//       if (user) {
//         // If user is already authenticated, log out
//         console.log('User logged out successfully!');
//         await signOut(auth);
//       } else {
//         // Sign in or sign up
//         if (isLogin) {
//           // Sign in
//           var res = await signInWithEmailAndPassword(auth, email, password);
//           console.log(res.user.uid);
//         } else {
//           // Sign up
//           var res = await createUserWithEmailAndPassword(auth, email, password);
//           console.log('res!');
//         }
//       }
//     } catch (error) {
//       console.error('Authentication error:', error.message);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {user ? (
//         // Show user's email if user is authenticated
//         <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
//       ) : (
//         // Show sign-in or sign-up form if user is not authenticated
//         <AuthScreen
//           email={email}
//           setEmail={setEmail}
//           password={password}
//           setPassword={setPassword}
//           isLogin={isLogin}
//           setIsLogin={setIsLogin}
//           handleAuthentication={handleAuthentication}
//         />
//       )}
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   authContainer: {
//     width: '80%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 16,
//     padding: 8,
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     marginBottom: 16,
//   },
//   toggleText: {
//     color: '#3498db',
//     textAlign: 'center',
//   },
//   bottomContainer: {
//     marginTop: 20,
//   },
//   emailText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
// });