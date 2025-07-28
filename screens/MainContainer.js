    import { StatusBar } from 'expo-status-bar';
    import { Pressable, Text, View, StyleSheet } from 'react-native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { NavigationContainer } from '@react-navigation/native';
    import Ionicons from 'react-native-vector-icons/Ionicons';

    // Screens
    import HomeScreen from './HomeScreen.js';
    import SearchScreen from './SearchScreen.js';
    import ProfileScreen from './ProfileScreen.js';

    // Screen name
    const homeName = 'Home';
    const searchName = 'Search';
    const profileName = 'Profile';


    // Tab
    const Tab = createBottomTabNavigator();

    export default function MainContainer({ user, onLogout}) {
        return (
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused,color, size}) => {
                        let iconName;
                        let routeName =  route.name;

                        if (routeName === homeName)  {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (routeName === searchName) {
                            iconName = focused ? 'list' : 'list-outline';
                        } else  if (routeName === profileName) {
                            iconName = focused ?   'body' : 'body-outline';
                        }
                        // ADD SETTINGS NAME MAYBE

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={searchName} component={SearchScreen}/>
                <Tab.Screen 
                    name={profileName} 
                    children={() => <ProfileScreen  user={user}
                                                    onLogout={onLogout}/>}
                />
            </Tab.Navigator>
        )
    }