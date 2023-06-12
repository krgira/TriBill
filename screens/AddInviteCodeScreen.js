import React, {useState} from "react";
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function AddInviteCodeScreen() {
  const [inviteCode, setInviteCode] = useState('');
  console.log(inviteCode);

  const invitePlz = async (inviteCode) => {
    try {
      const userName = await AsyncStorage.getItem('userInfo.name');
      console.log(userName);

      const response = await axios.post(`http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/invite/${inviteCode}/user?Name=${userName}`, {
        // Add any additional data you want to send in the request body
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    
      const data = response.data;
      console.log(data);
    
      console.log("fetch end");
    } catch (error) {
      console.error(error);
    }
  };

    const handleLaterButtonPress = () => {
        //navigation.navigate("MainTab");
      };
    
      const handleAddButtonPress = () => {
        invitePlz(inviteCode);
        //navigation.navigate("MainTab");
      };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>이미 여행을 만드셨나요?</Text>
            <TextInput 
              style={styles.invitecode}
              placeholder="초대코드 입력"
              onChangeText={setInviteCode}
              value={inviteCode}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.laterButton} onPress={handleLaterButtonPress}>
                    <Text style={styles.laterButtonText}>나중에</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                    <Text style={styles.addButtonText}>입력하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Add this line to center the text horizontally
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center', // Add this line to center the text horizontally
        marginTop: '50%', // Add this line to center the text vertically
    },
    invitecode: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: '#99B7DB',
        borderRadius: 15,
        textAlign: 'auto',
        marginTop: '20%', // Add this line to center the text vertically
        width: '90%',
    },
    buttonContainer: {
        marginTop: '80%', // Add this line to center the text vertically
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 327,
      },
      laterButton: {
        width: 155,
        height: 48,
        borderWidth: 1.5,
        borderColor: '#4974A5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addButton: {
        width: 155,
        height: 48,
        backgroundColor: '#4974A5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      laterButtonText: {
        // fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '900',
        lineHeight: 19,
        letterSpacing: 0.005,
        textAlign: 'center',
        color: '#4974A5',
      },
      addButtonText: {
        // fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '900',
        lineHeight: 19,
        letterSpacing: 0.005,
        textAlign: 'center',
        color: '#FFFFFF',
      },
});
export default AddInviteCodeScreen;