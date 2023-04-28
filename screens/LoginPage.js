import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import BookList from '../components/BookList';
import { db, firestore, auth } from '../FirebaseConfig';
import NewBookDetailsInput from '../components/NewBookDetailsInput';

export default function App( {navigation} ) {

  const [isAddMode, setIsAddMode] = useState(false);
  [loginEmail, setLoginEmail] = useState('');
  [loginPassword, setLoginPassword] = useState('');
  [loggedIn, setLoggedIn] = useState(false);
  [piclink, setpicLinkData] = useState('');
  [dname, setNameData] = useState('');
  [period, setPeriodData] = useState('');
  [author, setAuthorData] = useState('');
  [year, setYearData] = useState('');


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
        Alert.alert('You are logged in!');
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
        Alert.alert('You are logged out!');
        setLoggedIn(false);
      }
    });
  }

  function saveDataWithFirebase() {
    // *********************************************************************
    // When saving data, to create a new collection you can use SET 
    // and when updating you can use UPDATE (refer to docs for more info)
    // -- https://firebase.google.com/docs/firestore/manage-data/add-data
    // *********************************************************************

    var userId = auth.currentUser.uid;



    // SAVE DATA TO FIRESTORE
    firestore.collection('books').doc(userId).set(
      {
        text: databaseData,
      },
      {
        merge: true // set with merge set to true to make sure we don't blow away existing data we didnt intend to
      }
    )
      .then(function () {
        Alert.alert('Document successfully written!');
      })
      .catch(function (error) {
        Alert.alert('Error writing document');
        console.log('Error writing document: ', error);
      });
  }

  function retrieveDataFromFirebase() {

    var userId = auth.currentUser.uid;


    db.ref('/books/' + userId).once('value').then(function (snapshot) {
       setDatabaseData(snapshot.val().text);
    });

    /*****************************/
    // LOAD DATA FROM FIRESTORE
    /*****************************/

    // read once from data store
    firestore.collection("users").doc(userId).get()
      .then(function (doc) {
        if (doc.exists) {
          setDatabaseDataPicLink(doc.data().piclink);
          setDatabaseDataName(doc.data().name);
          setDatabaseDataPeriod(doc.data().period);
          setDatabaseDataAuthor(doc.data().author);
          setDatabaseDataYear(doc.data().year);
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    }

    const cancelHandler = () => {
      navigation.navigate('IntroPage');
  }
    const contactUsHandler = () => {
      navigation.navigate('ContactUs');
  }


  
  return (
    <ScrollView style={styles.page}>
    <View style={styles.form}>
        {!loggedIn &&
        <View>
            <Text style={styles.label}>Log in to our library!</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={ (value) => setLoginEmail(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="email"
            />
            <TextInput
            style={styles.textInput}
            onChangeText={ (value) => setLoginPassword(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            keyboardType="visible-password"
            placeholder="password"
            />
           <Button title="Login" color="#c47245" onPress={loginWithFirebase} />
           <Button title="CANCEL" color="#d43300" onPress={cancelHandler} />
        </View>
        }
        {loggedIn &&
        <View>
             <BookList/>
             <View style={styles.buttonContainer}>
             <NewBookDetailsInput visible={isAddMode} onCancel={() => setIsAddMode(false)} onAddItem={saveDataWithFirebase} />
            <Button title="Upload a Book" color="#c47245" onPress={() => setIsAddMode(true)} />
            <Button title="Sign Out" color="#d43300" onPress={signoutWithFirebase} /> 
          </View>
          <Text style={styles.footer}>Have any questions or recommendations to us? Then please contact us!</Text>
          <Button title="Contact Us" color="#c47245" onPress={contactUsHandler}/>
        </View>
        }
    </View> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
      margin: 30,
      marginTop: 60,
  },
  page: {
    backgroundColor:'#57311c',

  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',

  },
  label: {
      fontSize: 22,
      marginBottom: 30,
      textAlign: 'center',
      fontWeight:'bold',
      color: '#b7876d'
  },
  items: {
    width: '40%',
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'center',
    margin: 15,
    border:'solid'
  },
  image: {
    //float: 'left',
    width: 150, 
    height: 220
  },
  textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      textAlignVertical: 'top',
      backgroundColor:'#b7876d'
  },
  buttonContainer: {
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
      width: '40%',
      marginBottom: 5
  },  
  signOutButton: {
    paddingVertical: 40
  },
  footer: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'bold',
    color: '#b7876d'
  }
});
