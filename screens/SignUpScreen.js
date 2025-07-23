
import { StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebaseConfig.js'
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignUpScreen({navigation}) {

  function signUp(email, password) {
    const auth = getAuth(app);
    
    createUserWithEmailAndPassword(
        auth,
        email ,
        password
    )
        .then(() => {
          Alert.alert("Sign up successful")
          navigation.navigate('LoginScreen')})
        .catch((err) => console.log(err));       
  }

  const [email, setEmail] =  useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);        

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo}source={require('../assets/nuslogo.png')}/>   
      
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        
        <View style={styles.inputBox}>
          <TextInput 
            placeholder = "Email"
            style = {styles.input} 
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput 
            placeholder = "Password"
            style = {styles.input} 
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />         
        </View>

        <View style={styles.inputBox}>
          <TextInput 
            placeholder = "Confirm Password"
            style = {styles.input} 
            secureTextEntry={!showPassword}   
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />   
        </View>

      </View>
      
      <Pressable
        style = {({ pressed }) => [
          styles.ConfirmButton,
          pressed && styles.buttonPressed
          ]}
        
          onPress={() => {
            if (password == confirmPassword) {
              signUp(email, password);
            } else {
              Alert.alert("Password not the same")
            }
          }}
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
    flex: 1
  },

  inputContainer: {
    gap: 10,
    width: 270,
  },

  ConfirmButton:{
    paddingLeft:16,
    paddingRight:16,
    paddingVertical:5,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:20,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1.2,
    borderRadius:  10,
    paddingRight: 8
  }
});
