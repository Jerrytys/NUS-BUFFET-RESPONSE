import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen.js';
import SearchScreen from './SearchScreen.js';

// Screen name
const homeName = 'Home';
const searchName = 'Search';


// Tab
const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused,color, size}) => {
                    let iconName;
                    let routeName =  route.name;

                    if (routeName === homeName)  {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routeName === searchName) {
                        iconName = focused ? 'list' : 'list-outline'
                    }
                    // ADD SETTINGS NAME MAYBE

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}>

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={searchName} component={SearchScreen}/>

        </Tab.Navigator>
    )
}