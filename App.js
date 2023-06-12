import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import LoginTestScreen from './screens/LoginTestScreen';
import MainTab from './screens/MainTab';
import MapScreen from './screens/MapScreen';
import CurrencyScreen from './screens/CurrencyScreen';
import AddInviteCodeScreen from './screens/AddInviteCodeScreen';
import ChangeCurrencyButton from './components/ChangeCurrencyButton';
import AlarmCurrencyButton from './components/AlarmCurrencyButton';

const App = () => {
  return (

    //  <NavigationContainer>
    //    <MainTab />
    // </NavigationContainer>
 

    //<LoginTestScreen />
   <MapScreen />
    //<SettingScreen/>
    //<ChangeCurrencyButton/>
    //<AlarmCurrencyButton/>
    //<CurrencyScreen />
  );
};

export default App;
