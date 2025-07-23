
import { StatusBar } from 'expo-status-bar';
import { Pressable, TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert} from 'react-native';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../firebaseConfig.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function LoginScreen({navigation, onLoginSuccess}) {

  function signIn(email, password) {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Signed in Successful");
        onLoginSuccess() // TO BE  CHANGED
      })
      .catch((error) => {
        Alert.alert("Wrong Email or Password");
      });
  }
  
  const [email, setEmail] =  useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);        

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  
  return (
    <View style={styles.container}>
        
      <Image style={styles.logo}source={require('../assets/nuslogo.png')}/>   

      <Text style={styles.title}>LOGIN</Text>
      
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
      </View>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress ={() => signIn(email, password)}
      >

        <Text style={styles.loginText}>Login</Text>

      </TouchableOpacity>

      <View style={styles.login}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <Pressable
         style = {({ pressed }) => [
          styles.SignUpButton,
          pressed && styles.buttonPressed
         ]}

         onPress={() => navigation.navigate('SignUpScreen')}
         >
          {({ pressed }) => (
            <Text style = {[styles.SignUpButton, pressed && styles.textPressed]}>
              Sign Up
            </Text>
          )}
         </Pressable>

      </View>

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
  input: {
    width: 250,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    
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

  textPressed:{
    textDecorationLine: 'underline',
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
