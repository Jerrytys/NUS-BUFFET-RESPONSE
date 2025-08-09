import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Pressable, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { db } from '../firebaseConfig.js';
import { collection, onSnapshot } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';


export default function SearchScreen() {

  const route = useRoute();
  const { marker } = route.params;
  
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const fetchedMarkers = snapshot.docs
        .map(doc => doc.data().marker)
        .filter(Boolean);
      setMarkers(fetchedMarkers);
    });
    return unsubscribe;
  }, []);

  const InitialRegion =  {
    latitude: marker.latitude,
    longitude: marker.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion = { InitialRegion }
        showsIndoors
        userInterfaceStyle="dark"
        provider={PROVIDER_GOOGLE}
      >
        {markers.map((m, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
          />
))}

      </MapView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: { fontSize: 30, color: 'white' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});