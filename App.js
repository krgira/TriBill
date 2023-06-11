import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import LoginTestScreen from './screens/LoginTestScreen';
import MainTab from './screens/MainTab';
import MapScreen from './screens/MapScreen';

const App = () => {
  return (
    <NavigationContainer>
      <MainTab />
     {/*<RootStack />*/}
    </NavigationContainer>



    //<LoginTestScreen />
    //<MapScreen />
    //<SettingScreen/>
    //<AlarmCurrencyButton/>
  );
};

export default App;
