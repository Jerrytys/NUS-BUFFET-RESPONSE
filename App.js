import * as React from 'react';
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Main from './screens/Main.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';

import MainContainer from './screens/MainContainer.js';

const loginStack = createNativeStackNavigator();

function LoginStackScreen({onLoginSuccess}) {
    return (
        <loginStack.Navigator
            screenOptions={{
            headerShown: false
            }}>

            <loginStack.Screen
                name="Main"
                component={Main}
            />

            <loginStack.Screen
                name="LoginScreen"
            >
                {prop => <LoginScreen{...prop} onLoginSuccess={onLoginSuccess} />}
            </loginStack.Screen>
            
            <loginStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
            />

        </loginStack.Navigator>
    )
}


export default function App() {

    const [isLoggedIn, setLogin] = useState(false);
    const [user, setUser] =  useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const jsonUser = await AsyncStorage.getItem('@user');
                if (jsonUser) {
                    // Parse User from String into Object
                    const parsedUser  = JSON.parse(jsonUser);
                    setUser(parsedUser);
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            } catch (e) {
                console.error('Failed to load user', e)
            }
        };
        loadUser();
    }, []);

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainContainer  user={user}
                                          onLogout={ async () => {
                                                    await AsyncStorage.removeItem('@user');
                                                    setLogin(false);
                                                    setUser(null)}}/> 
                        : <LoginStackScreen onLoginSuccess={(user) => {
                                                                setLogin(true); 
                                                                setUser(user)}} />}
        </NavigationContainer>
    );
}