import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';   


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style = {({ pressed } ) =>[
          styles.Add_Button,
          pressed && styles.Add_Button_Pressed
        ]}

        onPress ={() =>{
          Alert.alert("Select Faculty")
        }}
      >
        <Text>+ Add Faculty</Text>
      </TouchableOpacity>

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
  }
});
