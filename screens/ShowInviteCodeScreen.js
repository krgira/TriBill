import React, {useState, useEffect} from 'react';
import { Clipboard, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function ShowInviteCodeScreen() {
    const [inviteCode, setInviteCode] = useState('');
    const route = useRoute();
    const {id} = route.params;
    //const inviteCode = "asdfDa1";


    const postTripId = async () => {   
        try {
          const response = await axios.post(
            `http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/invite/trip/${id}`,
            { id },
            {headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          //console.log(response.data);
          setInviteCode(response.data.inviteCode)
        } catch (error) {
          console.error(error);
        }
        console.log('ShowInvite fetch end');
      };
    
      useEffect(() => {
        postTripId();
      }, []);

      const copyToClipboard = () => {
        Clipboard.setString(inviteCode);
      };


    return(
        <View style={styles.container}>
            <Text style={styles.text}>초대 코드</Text>
            <Text style={styles.description}>터치 시 복사됩니다</Text>
            <TouchableOpacity style={styles.codeContainer} onPress={copyToClipboard()}>
              <Text style={styles.codeText} selectable={true}> 
                  {inviteCode}
              </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },  
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        //paddingVertical:10, 
    },
    description: {
      paddingVertical:10,
    },
    codeContainer:{
      borderWidth:2,
      borderRadius:10,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderColor: "#99B7DB",
      marginTop: "10%",
    },  
    codeText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
});

export default ShowInviteCodeScreen;