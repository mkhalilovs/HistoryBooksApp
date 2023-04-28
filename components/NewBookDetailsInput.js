import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { firestore, auth } from '../FirebaseConfig';


const NewBookDetailsInput = details => {
    [piclinkData, setpicLinkData] = useState('');
    [nameData, setNameData] = useState('');
    [periodData, setPeriodData] = useState('');
    [authorData, setAuthorData] = useState('');
    [yearData, setYearData] = useState('');

    function saveDataWithFirebase() {

        var userId = auth.currentUser.uid;

        // SAVE DATA TO FIRESTORE
        firestore.collection('books').add(
          {
            piclink: piclinkData,
            name: nameData,
            period: periodData,
            author: authorData,
            year: yearData
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
    

    return (
        <Modal visible={details.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput placeholder="Picture link" style={styles.input} onChangeText={(value) => setpicLinkData(value) } />
                <TextInput placeholder="Name" style={styles.input} onChangeText={(value) => setNameData(value) } />
                <TextInput placeholder="Period" style={styles.input} onChangeText={(value) => setPeriodData(value) } />
                <TextInput placeholder="Author" style={styles.input} onChangeText={(value) => setAuthorData(value) } />
                <TextInput placeholder="Year" style={styles.input} onChangeText={(value) => setYearData(value) } />
                <View style={styles.buttonContainer} >
                    <View style={styles.button} ><Button title="CANCEL" color="#d43300" onPress={details.onCancel} /></View>
                    <View style={styles.button}><Button style={styles.button} title="Upload" color="#8e3e22" onPress={saveDataWithFirebase} /></View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#472013'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        backgroundColor: '#b7876d',
        borderWidth: 1,
        borderRadius: 5,
        padding: 4,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%'
    },
    button: {
        width: '40%'
    }
});


export default NewBookDetailsInput
