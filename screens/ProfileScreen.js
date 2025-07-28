import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, StyleSheet, Alert } from 'react-native';   
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';


export default function ProfileScreen({ user, onLogout }) {

    const handleLogout = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys); // Clear all stored data

            // Reset navigation stack to the login screen
            
            //onLogout?.() // ?. is optional chaining operator, does not crash if does not exist
            Alert.alert('Logged out')
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>
          <Text>User: {user.email} </Text>
          <Pressable
              style = {({ pressed } ) =>[
              styles.logoutButton,
              pressed && styles.logoutButtonPressed
              ]}

              onPress ={() =>{
                  handleLogout();
              }}
          >
              <Text>Logout</Text>
          </Pressable>

          <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20
  },
  
  logoutButton:{
    fontSize: 30,
    marginBottom: 15,
    backgroundColor:'#1fcbd7ff',
    padding: 10,
    borderRadius: 10,
  },

  logoutButtonPressed:{
    color:'#rgba(34, 244, 220, 1)',
  }
});
