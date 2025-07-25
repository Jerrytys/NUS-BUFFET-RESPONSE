import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { Alert, TextInput, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Pressable
        style = {({ pressed } ) =>[
          styles.Add_Button,
          pressed && styles.Add_Button_Pressed
        ]}
      >
        + Add Faculty
      </Pressable>
      <Text style={styles.title}>Home</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: Home,
    Search: Search,
  },
});

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
  
  logo: {
    height: 240,
    width: 240,
    marginBottom: 30,
  },

  Add_Button:{
    fontSize: 30,
    marginBottom: 15,
    color:'#2ef7e0ff',
  },

  Add_Button_Pressed:{
    color:'#rgba(34, 244, 220, 1)',
  }
});
