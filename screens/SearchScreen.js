import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Pressable, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';

let nextId = 0; // simple id generator

export default function SearchScreen() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pendingLocation, setPendingLocation] = useState(null);

  // Get user location once
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Location permission is required for this feature");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  // Check for expired markers every second and remove them
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setMarkers((currentMarkers) =>
        currentMarkers.filter(({ expiryTime }) => {
          const [hour, minute] = expiryTime.split(':').map(Number);
          const expiry = new Date();
          expiry.setHours(hour, minute, 0, 0);
          return now < expiry; // keep if not expired
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddMarker = async () => {
    const currentLocation = await Location.getCurrentPositionAsync({});
    setPendingLocation(currentLocation.coords);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (!selectedTime || !pendingLocation) return;

    const hour = selectedTime.getHours().toString().padStart(2, '0');
    const minute = selectedTime.getMinutes().toString().padStart(2, '0');
    const expiryTime = `${hour}:${minute}`;

    setMarkers((current) => [
      ...current,
      {
        id: nextId++,
        latitude: pendingLocation.latitude,
        longitude: pendingLocation.longitude,
        expiryTime,
      },
    ]);

    setPendingLocation(null);
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsIndoors
        userInterfaceStyle="dark"
      >
        {markers.map(({ id, latitude, longitude, expiryTime }) => (
          <Marker
            key={id}
            coordinate={{ latitude, longitude }}
            title="Buffet Location"
            description={`Expires at ${expiryTime}`}
          />
        ))}
      </MapView>

      <Pressable style={styles.button} onPress={handleAddMarker}>
        <Text style={styles.buttonText}>＋</Text>
      </Pressable>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

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