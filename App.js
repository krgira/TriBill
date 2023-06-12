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
  const getFonts = async () => {
    await Font.loadAsync({
      Inter_Black: require("./assets/fonts/Inter-Black.ttf"),
      Inter_Bold: require("./assets/fonts/Inter-Bold.ttf"),
      Inter_ExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
      Inter_SemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    });
  };

  return (

    <NavigationContainer>
       <RootStack />
    </NavigationContainer>
 

    //<LoginTestScreen />
   //<MapScreen />
    //<SettingScreen/>
    //<ChangeCurrencyButton/>
    //<AlarmCurrencyButton/>
    //<CurrencyScreen />
  );
};

export default App;
