import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import CurrencyScreen from './CurrencyScreen';
import MapScreen from './MapScreen';
import SettingScreen from './SettingScreen';

import MainListScreen from './MainListScreen';
import MainScreen from './MainScreen';
import MainDetailScreen from './MainDetailScreen';
import ShowInviteCodeScreen from './ShowInviteCodeScreen';

// Create a Stack Navigator for the screens nested within the MainTab
const MainStack = createStackNavigator();

// Define the screens for the MainStack
const MainStackScreens = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="MainList"
      component={MainListScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Main"
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="MainDetail"
      component={MainDetailScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="ShowInviteCode"
      component={ShowInviteCodeScreen}
      options={{ headerShown: false }}
    />
  </MainStack.Navigator>
);

const Tab = createBottomTabNavigator();

function MainTab() {

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#4974A5',
      }}
    >
      <Tab.Screen 
        name='MainStack' 
        component={MainStackScreens} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="calendar-sharp" size={size} color={color} />
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
    paddingHorizonal: 25,
  },

});

export default MainTab;