import React, { useState } from 'react';
import { View } from 'react-native';
//import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import LoginTestScreen from './screens/LoginTestScreen';
import MainTab from './screens/MainTab';
import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import CurrencyScreen from './screens/CurrencyScreen';
import AddInviteCodeScreen from './screens/AddInviteCodeScreen';
import ChangeCurrencyButton from './components/ChangeCurrencyButton';
import AlarmCurrencyButton from './components/AlarmCurrencyButton';

const App = () => {

  return (

    <NavigationContainer>
       <MapScreen />
    </NavigationContainer>
 

    //<LoginTestScreen />
    
    //<SettingScreen/>
    //<ChangeCurrencyButton/>
    //<AlarmCurrencyButton/>
    //<CurrencyScreen />
  );
};

export default App;
