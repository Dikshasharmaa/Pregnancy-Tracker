import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ReminderScreen from '../Screens/ReminderScreen';
import KickCounter from '../Screens/KickCounter';


const Tab = createBottomTabNavigator();
export default function AppNavigation() {
    return(
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Reminder" component={ReminderScreen}/>
        <Tab.Screen name="KickCounter" component={KickCounter}/>

        </Tab.Navigator>
    </NavigationContainer>
    );

}