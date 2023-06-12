import {StatusBar} from 'expo-status-bar';
import React, { useState} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Image, Text, View, StyleSheet,TouchableOpacity,PixelRatio } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import MapScreen from './MapScreen';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const navigation = useNavigation();
  const [accessToken,setAccessToken] = useState();
  const [userInfo,setUserInfo] = useState();
  const [message,setMessage] = useState();
  const [jwtToken, setJwtToken] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '338399356732-aj4999ugrtv7ktrfnlt8mff0ki9ruh5m.apps.googleusercontent.com',
    iosClientId: '338399356732-8u0f78vqv5r8mp12gl3l5vtte3ig8jf2.apps.googleusercontent.com',
    androidClientId: '338399356732-s49643q71p8tu3jccm9r5im6dmenl58k.apps.googleusercontent.com',
   
  });

  async function sendUserDataToServer(accessToken, userInfo) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const dataToSend = {
        nickname: userInfo.name,
        email: userInfo.email,
        password: 1111,
      };
  
      const response = await axios.post(
        'http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/sign-up',
        dataToSend,
        { headers }
      );
  
      const jwtToken = response.data.token;
      await AsyncStorage.multiSet([
        ['jwtToken', jwtToken],
        ['userInfo.name', userInfo.name],
        ['userInfo.email', userInfo.email],
      ]);
  
      console.log(userInfo.name, userInfo.email);
      console.log('sendUserDataToServerSuccess', accessToken, dataToSend);
      console.log(jwtToken);
  
      setJwtToken(jwtToken);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
    }
  }
  

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === 'success') {
        setAccessToken(response.authentication.accessToken);
        sendUserDataToServer(accessToken, userInfo); // 서버로 데이터 전송
        getUserData();
        console.log('final post success');
        
        navigation.navigate('SetNation');
    }
    else{
        console.log('final post failed');      
    }
      }
  , [response]);


  async function getUserData() {
    try {
      const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = response.data;
      setUserInfo(data);
    } 
      catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
    <View style={styles.star}></View>
    <Text style={styles.welcome}>Welcome!</Text>
    <View style={styles.box}></View>
    <View style={styles.mentContainer}>
      <Text style={styles.ment}>⚡3초만에 시작하기</Text>
    </View>
    <TouchableOpacity 
      style={styles.googleButton} 
      onPress={accessToken ? getUserData : () => promptAsync({ showInRecents: true })}>
      <Image source={require('../assets/pressed.png')} style={{ width: '100%', height: '100%' }} />
    </TouchableOpacity>
    <StatusBar />
    {jwtToken && <MapScreen jwtToken={jwtToken} />} 
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
  star: {
    position: 'absolute',
    width: PixelRatio.roundToNearestPixel(645 / PixelRatio.get()),
    height: PixelRatio.roundToNearestPixel(637 / PixelRatio.get()),
    left: PixelRatio.roundToNearestPixel(-170 / PixelRatio.get()),
    top: PixelRatio.roundToNearestPixel(-182.55 / PixelRatio.get()),
    backgroundColor: '#99B7DB',
    borderRadius: PixelRatio.roundToNearestPixel(120 / PixelRatio.get()),
    transform: [{ rotate: '-14.59deg' }],
  },
  welcome: {
    position: 'absolute',
    width: 375,
    height: 109,
    left: 0,
    top: 239,
    paddingVertical: 40,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 29,
    letterSpacing: 0.01,
    textAlign: 'left',
  },
  box: {
    position: 'absolute',
    width: 92,
    height: 12.19,
    top: 410,
    backgroundColor: '#FFFEFC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
    zIndex: 1,
  },
  mentContainer: {
    position: 'absolute',
    width: 92,
    height: 12.19,
    top: 410,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  ment: {
    fontSize: 8,
    fontWeight: '500',
    lineHeight: 10,
    letterSpacing: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  googleButton: {
    position: 'absolute',
    width: 280,
    height: 40,
    top: 450,
    borderRadius: 9,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});