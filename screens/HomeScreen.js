import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; 
import { FlatList, Text, View, StyleSheet, Alert, Pressable, Modal, TextInput } from 'react-native';   
import { Dropdown } from 'react-native-element-dropdown';
import CardComponent from './Components/CardComponent';


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
  const [modalVisible, setModalVisible]  = useState(false);
  const [location, setLocation] =  useState('');
  const [description, setDescription] = useState('');
  const [clearBefore, setClearBefore] = useState('');

  const list = [
    {location: "SOC", clearBefore:"27/7/2025 2:00pm"}
  ]

  const renderItem = ({item}) => (
    <CardComponent location={item.location}  clearBefore={item.clearBefore} />
  )

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20}}>
        <Dropdown
          style ={styles.dropDown}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Filter Faculty"
          value={value}
          onChange={item => setValue(item.value)}
        />
      </View>

      <View style={styles.content}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput 
                placeholder = "Location"
                style = {styles.input} 
                value={location}
                onChangeText={text => setLocation(text)}
              />
              
              <TextInput 
                placeholder = "Description"
                style = {styles.input} 
                value={description}
                onChangeText={text => setDescription(text)}
              />

              <TextInput 
                placeholder = "ClearBefore"
                style = {styles.input} 
                value={clearBefore}
                onChangeText={text => setClearBefore(text)}
              />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable 
          style = { styles.AddButton }
          onPress={() => setModalVisible(true)}>
          <Text>Add Listing</Text>
        </Pressable>

        <FlatList
          data={list}
          renderItem={renderItem}
        />
        
      </View>


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

  content:{
    flex: 8,
    width: 320,
    marginTop: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'black',
    borderWidth: 1,
  },

  dropDown:{
    width:300,
    height:50,
    marginVertical: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  
  selectedTextStyle:{
    fontSize: 15,
    
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 150,
    width: 300,
    borderWidth:1,
    borderColor: 'black',
    marginVertical: 5,
  },

  AddButton:{
    fontSize: 30,
    marginVertical: 4,
    backgroundColor:'#f5ceebff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 40,
  },

  // MODAL STYLES FOR ADD LISTING
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    height: 40,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
