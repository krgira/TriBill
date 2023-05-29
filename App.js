import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDP8UMn1BEfAsdXqAMrDNJtqhUYKAOWncg",
  authDomain: "tribill-eaf40.firebaseapp.com",
  projectId: "tribill-eaf40",
  storageBucket: "tribill-eaf40.appspot.com",
  messagingSenderId: "586768083106",
  appId: "1:586768083106:web:78e28d40cb39c6dae60ffb",
  measurementId: "G-LJ0DZ4F46R"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <NavigationContainer>
        <RootStack />
    </NavigationContainer>
  );
};

export default App;
