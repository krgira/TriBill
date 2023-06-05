import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
 import LoginScreen from './screens/loginScreen';
 

const App = () => {
  return (
    <NavigationContainer>
        <RootStack />
    </NavigationContainer>
    // <LoginScreen />
  );
};

export default App;
