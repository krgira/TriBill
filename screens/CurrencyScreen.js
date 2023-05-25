import React from 'react';
import { View, StyleSheet } from 'react-native';

import CurrencyGraph from '../components/CurrencyGraph';
import ChangeCurrencyButton from '../components/ChangeCurrencyButton';

function CurrencyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.graph}>
      <CurrencyGraph />
      </View>
     <View style={styles.button}>
      <ChangeCurrencyButton />
     </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  graph: {
    flex: 0
  },
  button: {
    flex: 1
  },
});

export default CurrencyScreen;