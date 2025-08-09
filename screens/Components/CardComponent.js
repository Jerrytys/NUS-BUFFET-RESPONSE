import React from 'react';
import { Image, Text, StyleSheet, View, Pressable, Alert } from 'react-native';
import { db } from '../../firebaseConfig.js';
import { deleteDoc, doc } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const CardComponent = ({ description, location, clearBefore, postUser, currentUser, id, facultyValue,  marker }) => {

    // delete post if user is same as create post user with confirmation
    const deletePost = async () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },

                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const document = await doc(db,'posts', id);
                            deleteDoc(document);
                            console.log("Deleted item");
                        } catch (e) {
                            console.error("Failed to clear items", e);
                        }
                    }
                }
            ],
            { cancelable: true }
        )

    }
    
    const navigation = useNavigation();

    const moveToLocation = () => {
        navigation.navigate('Search', { marker });
    };

    return (
        <View style={styles.card}>
            <View  style={{flexDirection:"row", alignItems:'center'}}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.location}>Location: {location}</Text>
                    <Text style={styles.clearBefore}>Clear By: {clearBefore}</Text>
                </View>

                <View>

                    <Pressable 
                        onPress={moveToLocation}
                        style = {({ pressed }) => [
                            styles.DelButton,
                            pressed && styles.DelButtonPressed
                        ]}
                    >
                        <Entypo name="location" size={24} color="black" />
                    </Pressable>

                </View>

                <View>
                    {currentUser === postUser && (
                        <Pressable 
                            onPress={deletePost}
                            style = {({ pressed }) => [
                                styles.DelButton,
                                pressed && styles.DelButtonPressed
                            ]}
                        >
                            <MaterialCommunityIcons 
                                name="delete" 
                                size={24} 
                                color="black" 
                            />
                        </Pressable>
                    )}
                </View>

            </View>

        <View style={styles.separator}/>
        <View style ={styles.row}>
            <View style ={styles.descriptionComponent}>
                <Text style={styles.header}>Description: </Text>
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
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
    },
 
    location: {
        width:285,
        heigt:40,
        marginLeft: 8,
        marginRight: 10,
        marginTop: 8,
        
    },
    clearBefore: {
        width: 285,
        height: 30,
        marginLeft: 8,
        marginRight: 10,
        marginTop: 8,
        
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
        marginLeft: 8,
        borderRadius: 10,
        borderColor:'black',
        borderWidth:1,
        marginTop: 8,
    },

    DelButton:{
        fontSize: 30,
        marginVertical: 4,
        marginRight: 12,
        padding: 5,
        borderWidth:1,
        borderColor: 'black',
        borderRadius:10,
        paddingHorizontal: 8,
    },

    DelButtonPressed:{
        backgroundColor: '#cfe7f4ff',
        borderColor: '#192cd8ff'
    },
});

export default CardComponent;