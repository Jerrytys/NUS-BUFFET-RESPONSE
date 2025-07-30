import React from 'react';
import { Image, Text, StyleSheet, View, Pressable, Alert } from 'react-native';
import { db } from '../../firebaseConfig.js';
import { deleteDoc, doc } from 'firebase/firestore';

const CardComponent = ({ description, location, clearBefore, picture, postUser, currentUser, id }) => {

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

    return (
        <View style={styles.card}>
            <View  style={{flexDirection:"row", alignItems:'center'}}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.location}>Location: {location}</Text>
                    <Text style={styles.clearBefore}>ClearBy: {clearBefore}</Text>
                </View>

                <View>
                    {currentUser === postUser && (
                        <Pressable style={ styles.DelButton } onPress={deletePost}>
                            <Text>Delete</Text>
                        </Pressable>
                    )}
                </View>

            </View>

        <View style={styles.separator}/>
        <View style ={styles.row}>
            <Image
                style={styles.picture}
                source={{ uri: picture }} 
            />
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
    },

    DelButton:{
        fontSize: 30,
        marginVertical: 4,
        backgroundColor:'#cfe7f4ff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 40,
    },
});

export default CardComponent;