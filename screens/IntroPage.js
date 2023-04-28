import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
import { db, firestore, auth } from '../FirebaseConfig';

export default function App({ navigation }) {
  const pressHandlerLogin = () => {
    navigation.navigate('Login');
  }

  const pressHandlerSignUp = () => {
    navigation.navigate('SignUp');
  }




  [registrationEmail, setRegistrationEmail] = useState('');
  [registrationPassword, setRegistrationPassword] = useState('');
  [loginEmail, setLoginEmail] = useState('');
  [loginPassword, setLoginPassword] = useState('');
  [loggedIn, setLoggedIn] = useState(false);
  [signMethod, setSignMethod] = useState(false);
  [databaseData, setDatabaseData] = useState('');


  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert('user registered!');

        setRegistrationEmail('');
        setRegistrationPassword('');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        }
        else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      }
      );
  }

  loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (loginPassword.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        Alert.alert('user logged in!');
        setLoggedIn(true);

        // load data
        //retrieveDataFromFirebase();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password.');
        }
        else {
          Alert.alert(errorMessage);
        }
      }
      );
  }

  signoutWithFirebase = () => {
    auth.signOut().then(function () {
      // if logout was successful
      if (!auth.currentUser) {
        Alert.alert('user was logged out!');
        setLoggedIn(false);
      }
    });
  }


  const image = { uri: "https://w0.peakpx.com/wallpaper/134/287/HD-wallpaper-books-in-the-shelf-book-classic.jpg" };
  

  return (
    <View style={styles.container}>
      <ImageBackground source = {image} resizeMode="cover" style={styles.image}>
      <Text style={styles.header}>Explore our history book library!</Text>
        <View style={styles.buttonContainer}>          
          <Button 
          title="Log In"
          setLoggedIn={true} 
          onPress={pressHandlerLogin}
          color="#682a08"
          />

          <Button 
          title="Sign Up"
          onPress={pressHandlerSignUp}
          color="#c47245"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  header: {
    textAlign:'center',
    fontSize: 30,
    color: '#8f360d',
    backgroundColor: '#000000d6',
    fontWeight: 'bold',
    marginTop: 50
  },
  label: {
      fontSize: 18,
      marginBottom: 30,
      textAlign: 'center'
  },
  textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      textAlignVertical: 'top'
  },
  buttonContainer: {
      paddingVertical: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '35%',
      marginLeft: 120,
      marginTop: 160
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
      width: '50%',
  },  
  signOutButton: {
    paddingVertical: 40
  } 
});
