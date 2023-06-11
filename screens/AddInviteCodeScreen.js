import React from "react";
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native';

function AddInviteCodeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>이미 여행을 만드셨나요?</Text>
            <TextInput 
                style={styles.invitecode}
                placeholder="초대코드 입력"></TextInput>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.laterButton}>
                    <Text style={styles.laterButtonText}>나중에</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>설정하기</Text>
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