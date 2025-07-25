import * as React from 'react';
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState } from 'react';

import Main from './screens/Main.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';

import MainContainer from './screens/MainContainer.js';

const loginStack = createNativeStackNavigator();
const mainStack = createNativeStackNavigator();

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
    
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainContainer/> : <LoginStackScreen onLoginSuccess={() => setLogin(true)} />}
        </NavigationContainer>
    );
}