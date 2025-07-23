import * as React from 'react';
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/Main.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}>

                <Stack.Screen
                    name="Main"
                    component={Main}
                />

                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                />
                
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}