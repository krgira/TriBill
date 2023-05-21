import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './screens/MainTab';
import NationList from './components/NationList';

const App = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    console.log('Search Text:', searchText);
  };

  return (
    <NavigationContainer>
      <View>
        <NationList />
      </View>
      <MainTab />
    </NavigationContainer>
  );
};

export default App;
