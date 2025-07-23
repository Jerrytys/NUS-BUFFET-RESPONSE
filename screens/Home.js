import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,  } from 'react-native';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}source={require('../assets/nuslogo.png')}/>   
      
      <Text style={styles.title}>Home</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8AC',
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

});
