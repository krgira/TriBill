import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
 import LoginTest from './screens/loginTest';
 

const App = () => {
  return (
    // <NavigationContainer>
    //     <RootStack />
    // </NavigationContainer>
     <LoginTest />
  );
};

export default App;
