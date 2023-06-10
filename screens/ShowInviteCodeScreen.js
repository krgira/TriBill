import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function ShowInviteCodeScreen() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY4NjQwODk2OSwiZW1haWwiOiJ0ZXN0ZXIyMzMzM0BuYXZlci5jb20ifQ.vXH-HK0g4okvL7YbeDqXx354wLdnp5TKahqPYLbDuyStOLDM3SxPXVCQqja9h4_nP3NpzpNqAQBu_c3k8UpK0w';
    const [inviteCode, setInviteCode] = useState('');
    const route = useRoute();
    const {id} = route.params;

    const postTripId = async () => {   
        try {
          const response = await axios.post(
            `http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/invite/trip/${id}`,
            { id },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          //console.log(response.data);
          setInviteCode(response.data.inviteCode)


        } catch (error) {
          console.error(error);
        }
      
        console.log('fetch end');
      };
    

      useEffect(() => {
        postTripId();
      }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.text}>친구 초대 코드</Text>
            <Text style={styles.codeText}>{inviteCode}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },  
    text: {
        alignItems: 'center',
        
    },
    codeText: {

    },
});

export default ShowInviteCodeScreen;