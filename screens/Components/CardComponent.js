import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const CardComponent = ({ description, location, clearBefore, picture }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.location}>Location: {location}</Text>
      <Text style={styles.clearBefore}>ClearBy: {clearBefore}</Text>
      <View style={styles.separator}/>
      <View style ={styles.row}>
        <Image style ={styles.picture}>{picture}</Image>
        <View style ={styles.descriptionComponent}>
            <Text style={styles.header}>Description:</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({

    card: {
        flex: 1,
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
    },
 
    location: {
        width:285,
        heigt:40,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 5,
        
    },
    clearBefore: {
        width: 285,
        height: 30,
        marginLeft: 5,
        marginRight: 10,
        marginTop:5,
        
    },
    
    separator:{
        height: 1,
        backgroundColor: 'black',
        marginBottom:5,
    },

    row:{
        flexDirection: 'row',
        
    },
    
    descriptionComponent:{
        width: 170,
        height: 130,
        marginLeft: 8,
        marginRight: 10,
    },

    header:{
        fontSize:18,
    },
    
    description:{
        width: 170,
        height: 105,
        fontSize:15,
    },
    
    picture: {
        width:110,
        height:110,
        marginLeft: 5,
        borderRadius: 10,
        borderColor:'blue',
        borderWidth:1,
        marginTop: 8,
    }
});

export default CardComponent;