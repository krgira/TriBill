import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, PixelRatio, Button, } from 'react-native';
import { WebView, Linking } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function loginScreen() {
  const [userToken, setUserToken] = useState('');

  const handleGoogleButtonPress = async () => {
    await WebBrowser.openBrowserAsync(
      'http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/oauth2/authorization/google'
    );
  };

  const getUserToken = async () => {
    try {
      console.log('Fetching user token...');
      const response = await axios.get('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/login/oauth2/code/oauth2/tok');
      const userToken = response.data; // Assuming the response contains the userToken string
      setUserToken(userToken);
      console.log('User token:', userToken);
      return userToken;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };
  
  const handleWebViewNavigationStateChange = (navState) => {
    if (navState.url.includes('/login/oauth2/code/oauth2/sign-up')) {
      getUserToken()
        .then(() => {
          console.log('Token retrieval successful.');
        })
        .catch(() => {
          console.log('Token retrieval failed.');
        });
    }
  };

  const renderWebView = () => {
    return (
      <WebView
        source={{
          uri:
            'http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/oauth2/authorization/google',
        }}
        style={{ marginTop: 10 }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.star}></View>
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={styles.box}></View>
      <View style={styles.mentContainer}>
        <Text style={styles.ment}>⚡3초만에 시작하기</Text>
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleButtonPress}>
        <Image source={require('../assets/pressed.png')} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
      {renderWebView()}
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
