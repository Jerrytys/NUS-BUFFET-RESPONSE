import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect  } from 'react'; 
import { Platform, FlatList, Text, View, StyleSheet, Alert, Pressable, Modal, TextInput } from 'react-native';   
import { Dropdown } from 'react-native-element-dropdown';
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import CardComponent from './Components/CardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebaseConfig.js';  
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, query, where, GeoPoint } from 'firebase/firestore';
import * as Location from 'expo-location';


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
  const [facultyValue, setFacultyValue] = useState(null);
  const [modalVisible, setModalVisible]  = useState(false);
  const [location, setLocation] =  useState('');
  const [description, setDescription] = useState('');
  const [clearBefore, setClearBefore] = useState('');
  const [marker, setMarker] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [date, setDate] = useState(new Date());
  const [hasTime, setHasTime] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [dataList, setDataList] = useState([]);
  
  // const handleAddMarker = async() =>{
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if(status !== 'granted'){
  //     Alert.alert('Permission denied');
  //     return;
  //   }
    
  //   const currentlocation = await Location.getCurrentPositionAsync();

  //   const newMarker = {
  //     latitude: currentlocation.coords.latitude,
  //     longitude: currentlocation.coords.longitude,
  //     //afterwards store these values in the card

  //   };
  //   setMarker(newMarker);
  // };

 

  const renderItem = ({item}) => (
    <CardComponent location={item.location}  
                   clearBefore={item.clearBefore} 
                   description={item.description} 
                   postUser={item.postUser} 
                   currentUser={user.email}
                   id = {item.id}
                   facultyValue = {item.facultyValue}
                   marker = {item.marker}
    />
  )

  const addItem = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert('Permission denied');
      return;
    }
    
    const currentlocation = await Location.getCurrentPositionAsync();

    const marker = new GeoPoint(currentlocation.coords.latitude,  currentlocation.coords.longitude);

    const newItem = {
      location: location,
      clearBefore: clearBefore,
      description: description,
      postUser: user.email,
      facultyValue: parseInt(facultyValue),
      marker: marker,
    };

    console.log('Adding newItem:', newItem);
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
        facultyValue:  data.facultyValue,
        marker: data.marker,
      };
    }); 
  };

  const loadData = async () =>  {
    try {
      // const postRef = await getDocs(collection(db, 'posts'));
      const postRef = collection(db, 'posts');
      let q = facultyValue
              ? query(postRef, where("facultyValue", "==", parseInt(facultyValue)))
              : postRef
      // const listings = processSnapshot(snapshot);
      const filtered = await getDocs(q);
      const filteredListings = processSnapshot(filtered);
      setDataList(filteredListings);
    } catch (e) {
      console.error("Error getting listings:", e);
    }
  }    

  // reloads data after changing dropdown faculty
  useEffect(() => {
    if (facultyValue !== null) {
      loadData();
    }
  }, [facultyValue]);
  
  useEffect(() => {
    let q = collection(db, 'posts');

    if (facultyValue !== null) {
      q = query(q, where("facultyValue", "==", parseInt(facultyValue)));
    }

    // Real-time Listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listings = processSnapshot(snapshot);
      setDataList(listings);
    })


    // cleanup listener on unmount
    return unsubscribe;
  }, [facultyValue]);

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

  // check for required faculty change before able to add listing
  const addListing = () => {
    if (facultyValue == null) {
      Alert.alert("Please select a faculty before posting your listing")
    } else {
      setModalVisible(true);
    }
  }

  // check for required input before 
  const confirmListing = ()  => {
    if (location == "") {
      Alert.alert("Please input a valid location")
    } else if (clearBefore  == "") {
      Alert.alert("Please input a valid time")
    } else {
      setModalVisible(!modalVisible);
      addItem();
    }
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
          value={facultyValue}
          onChange={item => {setFacultyValue(item.value); loadData()}}
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
                    confirmListing();
                    // Alert.alert("Input Successful" ,"Now go to Search and mark buffet location(Your current location)");
                  }}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>

            </View>
          </View>
        </Modal>
        



        <FlatList
          data={dataList}
          renderItem={renderItem}
        />

        <View style={{flexDirection: 'row', gap: 150}}>
          <Pressable 
            onPress={() => addListing()}
            style = {({ pressed }) => [
                styles.AddButton,
                pressed && styles.buttonPressed
              ]}
          >
            <Entypo name="add-to-list" size={40} color="black" />
          </Pressable>

          <Pressable 
            onPress={() => loadData()}
            style = {({ pressed }) => [
              styles.RefreshButton,
              pressed && styles.buttonPressed
            ]}
          >
            <Ionicons name="refresh" size={40} color="black" />
          </Pressable>

        </View>
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
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },

  dropDown:{
    width:300,
    height:50,
    marginTop: 10,
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

  AddButton: {
    marginBottom: 5, 
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  
  RefreshButton: {
    marginBottom: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  
  buttonPressed:{
    backgroundColor: '#b3d9ee',
    
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
    gap: 100,
  },
  
});
