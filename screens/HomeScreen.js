import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; 
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';   
import { Dropdown } from 'react-native-element-dropdown';


const data = [
  {label:'School Of Computing', value: '1'},
  {label:'College of Design and Engineering', value: '2'},
  {label:'Faculty of Arts and Social Science', value: '3'},
  {label:'Faculty of Dentistry', value: '4'},
  {label:'Faculty of Law', value: '5'},
  {label:'School of Business', value: '6'},
  {label:'University Town', value: '7'},
];

export default function HomeScreen() {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.container}>
      <Dropdown
        style ={styles.dropDown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="+ Add Faculty"
        value={value}
        onChange={item => setValue(item.value)}
      />

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
  
  logo: {
    height: 240,
    width: 240,
    marginBottom: 30,
  },

  Add_Button:{
    fontSize: 30,
    marginBottom: 15,
    color:'#1fcbd7ff',
  },

  Add_Button_Pressed:{
    color:'#rgba(34, 244, 220, 1)',
  },

  dropDown:{
    width:200,
  }
});
