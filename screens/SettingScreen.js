import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


export default function SettingScreen() {
 
  return (
    <View style={styles.container}>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.005,
    color: '#1F2024',
    },
  userEmail: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.01,
    textAlign: 'center',
    },
});