import React, { useState } from 'react';
import {  Alert, StyleSheet, Text, View, Button } from 'react-native';
import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';



export default function App() {


  var [message, setMessage] = useState(); 

  let onChangeHandler = (value) => {
      setMessage(value);
  }

  sendWithText = async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
          const { result } = await SMS.sendSMSAsync(
              ['1234567890'],
              message
          );
          Alert.alert('SMS Sent!');
      } else {
          Alert.alert('SMS is not available!');
      }
  }

  sendMessageWithEmail = async () => {

    const isAvailable = await MailComposer.isAvailableAsync();

    if(isAvailable) {
      var options = {
        recipients: ['historybooks@mail.ca'],
        subject: '',
        body: message,
      };
      Alert.alert(
        'Your message has been sent succesfully'
      ),
      MailComposer.composeAsync(options).then((result) => { console.log(result.status); });
    } else {
      console.log("Email is not available on this device");
    }
  }



  return (
    <View style={styles.container}>
      <View>
        <Button  title="EMAIL" color="#c47245" onPress={sendMessageWithEmail} />
        <Button title="TEXT"  color="#c47245" onPress={sendWithText} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7876d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});