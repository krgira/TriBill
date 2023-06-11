import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';


export default function SettingScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const navigation = useNavigation();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await AsyncStorage.multiGet([
          'jwtToken',
          'userInfo.name',
          'userInfo.email',
        ]);
        const [, jwtToken] = userData[0]; // Ignore the first element (key-value pair for 'jwtToken')
        const [, name] = userData[1]; // Ignore the first element (key-value pair for 'userInfo.name')
        const [, email] = userData[2]; // Ignore the first element (key-value pair for 'userInfo.email')

        // Update the state with the retrieved values
        setName(name);
        setEmail(email);
        console.log(name, email);
      } catch (error) {
        console.log('Error retrieving user data:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['jwtToken', 'userInfo.name', 'userInfo.email']);
      // navigation.navigate('LoginTestScreen');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
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
    color: '#1F2024',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#99B7DB',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
