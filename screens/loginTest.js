import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken,setAccessToken] = React.useState();
  const [userInfo,setUserInfo] = React.useState();
  const [message,setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '338399356732-aj4999ugrtv7ktrfnlt8mff0ki9ruh5m.apps.googleusercontent.com',
    iosClientId: '338399356732-8u0f78vqv5r8mp12gl3l5vtte3ig8jf2.apps.googleusercontent.com',
    androidClientId: '338399356732-s49643q71p8tu3jccm9r5im6dmenl58k.apps.googleusercontent.com',
   
  });

  async function sendUserDataToServer(accessToken, userInfo) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };

      const dataToSend = {
        nickname: userInfo.name,
        email: userInfo.email,
        password: 1111
      };
  
      const response = await axios.post('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/oauth2/authorization/google', dataToSend, { headers });
  
      // 서버로부터의 응답 처리
      console.log('sendUserDataToServerSuccess',accessToken,dataToSend);
    } catch (error) {
      // 오류 처리
      console.error(error);
    }
  }

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === 'success') {
        setAccessToken(response.authentication.accessToken);
        sendUserDataToServer(accessToken, userInfo); // 서버로 데이터 전송
        console.log('final post success');      
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
      setUserInfo(data);} 
      
      catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
    <Button
      disabled={!request}
      title={accessToken ? "Get User Data" : "Login"}
      onPress={accessToken ? getUserData : () => {promptAsync({showInRecents: true})}}
    />
    <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({

    Button:{
        top:-200,
    }
})