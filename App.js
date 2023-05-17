import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './screens/MainTab'

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}