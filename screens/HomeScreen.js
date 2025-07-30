import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect  } from 'react'; 
import { Platform, FlatList, Text, View, StyleSheet, Alert, Pressable, Modal, TextInput, Image } from 'react-native';   
import { Dropdown } from 'react-native-element-dropdown';
import CardComponent from './Components/CardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebaseConfig.js';
import { collection, addDoc, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore';


const data = [
  {label:'School Of Computing', value: '1'},
  {label:'College of Design and Engineering', value: '2'},
  {label:'Faculty of Arts and Social Science', value: '3'},
  {label:'Faculty of Dentistry', value: '4'},
  {label:'Faculty of Law', value: '5'},
  {label:'School of Business', value: '6'},
  {label:'University Town', value: '7'},
];

export default function HomeScreen({ navigation, user }) {
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible]  = useState(false);
  const [location, setLocation] =  useState('');
  const [description, setDescription] = useState('');
  const [clearBefore, setClearBefore] = useState('');
  const [date, setDate] = useState(new Date());
  const [hasTime, setHasTime] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  
  const handleConfirm = async() =>{
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert('Permission denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const marker = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    navigation.navigate('Search', { markers: [marker] });
  };

  const openCamera = async() => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert('Permission denied', 'Camera permission is required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Captured Image URI:", uri);
      setImageUri(uri); // Optional: store or display the photo
    }
  };

  const renderItem = ({item}) => (
    <CardComponent location={item.location}  
                   clearBefore={item.clearBefore} 
                   description={item.description} 
                   picture = {item.picture} 
                   postUser={item.postUser} 
                   currentUser={user.email}
                   id = {item.id}
    />
  )

  const addItem = async () => {
    
    const newItem = {
      location: location,
      clearBefore: clearBefore,
      description: description,
      // picture: imageUrl || null,
      postUser: user.email,
    };

    try {
      await addDoc(collection(db, 'posts'), newItem);
      console.log('Listing added');
    } catch (e) {
      console.error('Failed to added item', e);
    }

    resetVariable();
  }

  const resetVariable = () => {
    setLocation("");  
    setClearBefore(new Date());
    setHasTime(false);
    setDescription("");
    setImageUri(null);
  }

  // Process snapshot of db to catch object conversion (timestamp)
  const processSnapshot = (snapshot) => {
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        location: data.location,
        description: data.description,
        clearBefore: data.clearBefore && data.clearBefore.toDate
          ? data.clearBefore.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : data.clearBefore || '',
        // picture: data.picture || null,
        postUser: data.postUser,
      };
    });
  };

  const loadData = async () =>  {
    try {
      const snapshot = await getDocs(collection(db, 'posts'));
      const listings = processSnapshot(snapshot);
      setDataList(listings);
    } catch (e) {
      console.error("Error getting listings:", e);
    }
  }    

  useEffect(() => {
    loadData();

    // Real-time Listener
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const listings = processSnapshot(snapshot);
      setDataList(listings);
    })

    // cleanup listener on unmount
    return unsubscribe;
  }, []);

  const clearAll = async () => {
    try {
      const snapshot = await getDocs(collection(db,'posts'));
      snapshot.docs.map((document) => deleteDoc(document.ref)) // Clear from firestore 
      console.log("Cleared all items");
    } catch (e) {
      console.error("Failed to clear items", e);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeTime = ({type},  selectedTime) => {
    if  (type == "set") {
      const currentTime = selectedTime;
      setDate(currentTime);
      if (Platform.OS === "android") {
        setClearBefore(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        toggleDatePicker();
        setHasTime(true);
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setHasTime(true)
    setClearBefore(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    toggleDatePicker();
  }

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
                placeholderTextColor={'#808080'}
                style = {styles.input} 
                value={location}
                onChangeText={text => setLocation(text)}
              />
              <Pressable
                onPress={toggleDatePicker}
              >
                <TextInput 
                  placeholder = "ClearBefore (e.g. 10.30pm,10/2/24)"
                  placeholderTextColor={'#808080'}
                  style = {styles.input} 
                  value={hasTime ? clearBefore
                                : ''
                        }
                  onChangeText={text => setClearBefore(text)}
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>

              {showPicker && (
                <DateTimePicker
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  value={date}
                  onChange={onChangeTime}
                />
              )}

              {showPicker &&  Platform.OS === "ios" && (
                <View
                  style={{ flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >

                  <Pressable style={[
                    styles.button,
                    { backgroundColor: "#11182711"}
                  ]}
                    onPress={toggleDatePicker}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>

                  <Pressable style={[
                    styles.button,
                    { backgroundColor: "#11182711"}
                  ]}
                    onPress={confirmIOSDate}
                  >

                    <Text style={styles.textStyle}>Confirm</Text>
                  </Pressable>
                </View>
              )
              }

              <TextInput 
                multiline
                numberOfLines={5}
                placeholder = "Description (6 lines max)"
                placeholderTextColor={'#808080'}
                style = {styles.inputDescription} 
                value={description}
                onChangeText={text => setDescription(text)}
              />
              <Pressable style={[styles.button, styles.buttonClose]} onPress={openCamera}>
                <Text>Take Photo</Text>
              </Pressable>
              {imageUri && (
                <Image 
                  source={{ uri: imageUri }} 
                  style={{ width: 200, height: 200, marginVertical: 10, borderRadius: 10 }} 
                />
              )}
              <View style={styles.horizontalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    resetVariable();
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    addItem();
                    Alert.alert("Input Successful" ,"Now go to Search and mark buffet location(Your current location)");
                  }}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>

            </View>
          </View>
        </Modal>

        <Pressable 
          style = { styles.AddButton }
          onPress={() => setModalVisible(true)}>
          <Text>Add Listing</Text>
        </Pressable>
        
        <View style={{flexDirection: 'row', gap: 8}}>
          <Pressable 
            style = { styles.AddButton }
            onPress={() => clearAll()}>
            <Text>clear all</Text>
          </Pressable>

          <Pressable 
            style = { styles.AddButton }
            onPress={() => loadData()}>
            <Text>refresh</Text>
          </Pressable>


        </View>

        <FlatList
          data={dataList}
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
    backgroundColor:'#cfe7f4ff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 40,
  },

  // MODAL STYLES FOR ADD LISTING
  input: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
    width: 240,
    height: 40,
  },
  inputDescription:{
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
    width: 240,
    height: 120,
    textAlignVertical:'top',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: '#cfe7f4ff',
    borderRadius: 20,
    padding: 25,
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

  horizontalButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  
});
