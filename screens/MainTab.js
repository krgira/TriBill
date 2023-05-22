import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MainScreen from './MainScreen';
import CurrencyScreen from './CurrencyScreen';
import MapScreen from './MapScreen';
import SettingScreen from './SettingScreen';

import SetScheduleScreen from './SetScheduleScreen';


const Tab = createBottomTabNavigator();

function MainTab() {

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#4974A5',
      }}
    >
      <Tab.Screen 
        name='Main' 
        component={MainScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="calendar-sharp" size={size} color={color} />
          ),
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress} style={styles.headerIcon}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerIcon}>
              <Text>Edit</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen 
        name='Currency' 
        component={CurrencyScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-logo-usd" size={24} color="black" />
          )
        }}
      />
      <Tab.Screen 
        name='Map' 
        component={MapScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-bar-chart-sharp" size={24} color="black" />
          )
        }}
      />
      <Tab.Screen 
        name='Setting' 
        component={SettingScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-sharp" size={24} color="black" />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    paddingHorizonal: 15,
  },

});

export default MainTab;