import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import setNationScreen from './setNationScreen';
import SetScheduleScreen from './SetScheduleScreen';
import targetAmountScreen from './targetAmountScreen';
import MainTab from './MainTab';
import MainDetailScreen from './MainDetailScreen';
import MainUpdateScreen from './MainUpdateScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="setNation"
        component={setNationScreen}
        options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="SetSchedule"
        component={SetScheduleScreen}
        //options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="targetAmount"
        component={targetAmountScreen}
        //options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen 
        name="MainDetail" 
        component={MainDetailScreen}
        //options={{headerShown: false}} 
        />
      <Stack.Screen 
        name="MainUpdate" 
        component={MainUpdateScreen}
        //options={{headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

export default RootStack;