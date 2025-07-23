import * as React from 'react';
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState } from 'react';

import Main from './screens/Main.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import Home from './screens/Home.js';

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

            <loginStack.Screen
                name = "Home"
                component = {Home}
            />
            
        </loginStack.Navigator>
    )
}
function MainStackScreen(){
    return(
        <mainStack.Navigator
              screenOptions={{
                headerShown: false
              }}>

                <mainStack.Screen
                    name = "Home"
                    component = {Home}
                />
                
        </mainStack.Navigator>
    )
}

export default function App() {

    const [isLoggedIn, setLogin] = useState(false);
    
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainStackScreen/> : <LoginStackScreen onLoginSuccess={() => setLogin(true)} />}
        </NavigationContainer>
    );
}