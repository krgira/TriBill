import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';


const App = () => {
  return (
    <NavigationContainer>
        <RootStack />
    </NavigationContainer>
  );
};

export default App;
