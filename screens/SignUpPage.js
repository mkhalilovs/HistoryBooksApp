import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../FirebaseConfig';

export default function App() {
  [registrationEmail, setRegistrationEmail] = useState('');
  [registrationPassword, setRegistrationPassword] = useState('');
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
        Alert.alert('You have been registered!');

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


  signoutWithFirebase = () => {
    auth.signOut().then(function () {
      // if logout was successful
      if (!auth.currentUser) {
        Alert.alert('You are logged out!');
        setLoggedIn(false);
      }
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
            <View>
              <Text style={styles.label}>Register to access our library!</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={ (value) => setRegistrationEmail(value) }
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder="email"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={ (value) => setRegistrationPassword(value) }
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="password"
                keyboardType="visible-password"
                placeholder="password"
              />
              <Button style={styles.button} title="Register" color="#c47245" onPress={registerWithFirebase} />
            </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#57311c'
  },
  form: {
      margin: 30,
      marginTop: 60,
  },
  label: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight:'bold',
    color: '#b7876d'
  },
  textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      textAlignVertical: 'top',
      backgroundColor:'#b7876d'  }
});
