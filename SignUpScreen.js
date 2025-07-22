
import { StatusBar } from 'expo-status-bar';
import { Pressable, TouchableOpacity, StyleSheet, Text, View, Image, Button } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}source={require('./assets/nuslogo.png')}/>   
      
      <Text style={styles.title}>Sign Up PAGE</Text>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <Pressable
         style = {({ pressed }) => [
          styles.SignUpButton,
          pressed && styles.buttonPressed
         ]}
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

});
