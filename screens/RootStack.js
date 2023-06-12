import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SetNationScreen from './SetNationScreen';
import SetScheduleScreen from './SetScheduleScreen';
import TargetAmountScreen from './TargetAmountScreen';
import AddInviteCodeScreen from './AddInviteCodeScreen';
import MainTab from './MainTab';
import LoginTestScreen from './LoginTestScreen';
import MainUpdateScreen from './MainUpdateScreen';
import ReportScreen from './ReportScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginTest"
        component={LoginTestScreen}
        options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="SetNation"
        component={SetNationScreen}
        options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="SetSchedule"
        component={SetScheduleScreen}
        //options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="TargetAmount"
        component={TargetAmountScreen}
        //options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="AddInviteCode"
        component={AddInviteCodeScreen}
        //options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{headerShown: false}}  // 헤더 중첩을 막기 위함
      />
    </Stack.Navigator>
  );
}

export default RootStack;