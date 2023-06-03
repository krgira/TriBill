import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, PixelRatio } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '338399356732-jkutfv9gkjis5736g4erm7f6p0kfq2rj.apps.googleusercontent.com',
    androidClientId: '338399356732-s49643q71p8tu3jccm9r5im6dmenl58k.apps.googleusercontent.com',
    iosClientId: '338399356732-8u0f78vqv5r8mp12gl3l5vtte3ig8jf2.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const handleKakaoButtonPress = () => {
    console.log('Kakao Button Pressed');
  };

  const handleGoogleButtonPress = async () => {
    console.log('Google Button Pressed');
    await WebBrowser.openBrowserAsync(
      'http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/oauth2/authorization/google'
    );
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const user = response.data;
      setUserInfo(user);
      console.log('User Info:', user); 
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.star}></View>
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={styles.box}></View>
      <View style={styles.mentContainer}>
        <Text style={styles.ment}>⚡3초만에 시작하기</Text>
      </View>
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoButtonPress}>
        <Image source={require('../assets/kakao_button.png')} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleButtonPress}>
        <Image source={require('../assets/pressed.png')} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
      {showWebView && <WebView source={{ uri: 'http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/oauth2/authorization/google' }} style={{ marginTop: 10 }} />}
      {userInfo !== null && <Text style={styles.text}>{userInfo.name}</Text>}
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
    left: -46,
    top: 354,
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
    left: -46,
    top: 354,
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
  kakaoButton: {
    position: 'absolute',
    width: 330,
    height: 50,
    top: 380,
  },
  googleButton: {
    position: 'absolute',
    width: 340,
    height: 50,
    top: 450,
    borderRadius: 9,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
