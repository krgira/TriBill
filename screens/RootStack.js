import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTab from './MainTab';
import MainDetailScreen from './MainDetailScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}

export default RootStack;