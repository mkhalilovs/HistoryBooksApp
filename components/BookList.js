import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { db, firestore, auth } from '../FirebaseConfig';

let books = [];

db.collection('books').get()
.then((snapshot) => {
  snapshot.docs.forEach(doc => {
    books.push(doc.data());

  })
})



const BookList = props => {


  [piclinkData, setpicLinkData] = useState('');
  [nameData, setNameData] = useState('');
  [periodData, setPeriodData] = useState('');
  [authorData, setAuthorData] = useState('');
  [yearData, setYearData] = useState('');

    return (
      <View>
      <Text style={styles.header}>Discover our books!</Text>
      <View style={styles.container}>
        <View style={styles.items}>
          <Image source = {{uri:'https://kbimages1-a.akamaihd.net/412095f6-33b1-4171-b0ec-ced5eecf866b/353/569/90/False/the-history-of-the-ancient-world-from-the-earliest-accounts-to-the-fall-of-rome.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The History of the Ancient World</Text>
          <Text>Ancient</Text>
          <Text>Susan Wise Bauer</Text>
          <Text>2007</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/81n2MTSOVWL.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The British in India</Text>
          <Text>Modern          </Text>
          <Text>David Gilmour       </Text>
          <Text>2019</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/51fkQc8Ca+L._SX331_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The Anglo-Saxons</Text>
          <Text>Early Middle Age</Text>
          <Text>Marc Morris          </Text>
          <Text>2022</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/416tNxMrYUL._SX348_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>A History of Ancient Persia</Text>
          <Text>Ancient          </Text>
          <Text>Maria Brosius           </Text>
          <Text>2020</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/61Tg7xZUkrL._SX498_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The Ottoman Empire 1300-1600</Text>
          <Text>Late Middle Ages</Text>
          <Text>Halil Inalcik              </Text>
          <Text>2000</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/41SWwt5oGCL._SX327_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>Northmen</Text>
          <Text>High Middle Ages</Text>
          <Text>John Haywood        </Text>
          <Text>2016</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/61P276x-DCL._SX570_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>A History of the Roman Republic</Text>
          <Text>Ancient</Text>
          <Text>Klaus Bringmann       </Text>
          <Text>2007</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/51Q9jg-pHML._SX331_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The French Revolution</Text>
          <Text>Revolutionary Period</Text>
          <Text>Ian Davidson              </Text>
          <Text>2018</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/613MF+W6jZL._SX315_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The Mongol Empire</Text>
          <Text>Late Middle Ages</Text>
          <Text>John Man                  </Text>
          <Text>2015</Text>
        </View>
        <View style={styles.items}>
          <Image source = {{uri:'https://m.media-amazon.com/images/I/51bfEG18oqL._SX331_BO1,204,203,200_.jpg'}}
          style = {styles.image}
          />
          <Text style={styles.title}>The Concise History of the Crusades</Text>
          <Text>High Middle Ages</Text>
          <Text>Thomas F. Madden</Text>
          <Text>2013</Text>
        </View>
      </View>
      </View>
  )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      },
      items: {
        width: '40%',
        flexDirection:'row', 
        flexWrap:'wrap',
        textAlign:'center',
        margin: 15,
      },
      image: {
        //float: 'left',
        width: 150, 
        height: 220
      },
      header: {
        fontSize: 22,
        marginBottom: 30,
        textAlign: 'center',
        fontWeight:'bold',
        color: '#b7876d'
      },
      title: {
        fontWeight: 'bold',
        color: '#c47245'
      },
      buttonContainer: {
        paddingVertical: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      button: {
          width: '40%',
      },  
      signOutButton: {
        paddingVertical: 40
      } 
})


export default BookList