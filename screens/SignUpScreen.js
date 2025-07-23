
import { StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Pressable, StyleSheet, Text, View, Image, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebaseConfig.js'
import React, { useState } from 'react';

export default function SignUpScreen(navigation) {

  function signUp(email, pw) {
    const auth = getAuth(app);
    
    createUserWithEmailAndPassword(
        auth,
        email ,
        pw
    )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));       
  }

  const [email, setEmail] =  useState('');
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo}source={require('../assets/nuslogo.png')}/>   
      
      <Text style={styles.title}>Sign Up PAGE</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder = "Email"
          style = {styles.input} 
          value={email}
          onChangeText={text => setEmail(text)}
        />
        
        <TextInput 
          placeholder = "Password"
          style = {styles.input} 
        />

        <TextInput 
          placeholder = "Confirm Password"
          style = {styles.input} 
        />
      </View>
      
      <Pressable
        style = {({ pressed }) => [
          styles.ConfirmButton,
          pressed && styles.buttonPressed
          ]}
        
          onPress={() => signUp(email, email)}
      >
        <Text>
          Confirm
        </Text>
      </Pressable>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8AC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20
  },
  
  logo: {
    height: 240,
    width: 240,
    marginBottom: 30,
  },
  
  login: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButton: {
    backgroundColor: '#4781FF',
    borderRadius: 25,
    margin: 20,
  },
  
  loginText: {
    paddingLeft: 120,
    paddingRight: 120,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 20,
  },

  SignUpButton:{
    color: '#4781FF',
    paddingLeft: 5,
    fontSize: 18,
  },
  
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },

  inputContainer: {
    gap: 10,
    width: 270,
  },

  ConfirmButton:{
    paddingLeft:5,
    paddingRight:8,
    paddingVertical:5,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:20,
  },

});
