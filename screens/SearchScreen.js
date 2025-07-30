import React, { useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet,  } from 'react-native';   



export default function SearchScreen() {
  const [markers, setMarkers] = useState([]);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers([...markers, coordinate]);
  };

  return (
    
    <View style={styles.container}>
      <MapView
       style ={styles.map}
       initialRegion={{
        latitude: 1.296849,
        longitude: 103.776906,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        }}
        userInterfaceStyle = 'dark'
        showsIndoors = {true}
        onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Marker ${index + 1}`} // set name of marker to Marker 1,2,3 etc
            onLongPress={() => {
            // Remove marker at this index
            setMarkers(markers.filter((_, i) => i !== index));
            }}
          />
        ))}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },
});
