import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

function AlarmCurrencyButton() {

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY4NTg4NzkwNCwiZW1haWwiOiIzNzMyOGRlZC04OGE0LTQ0MjQtYWZhYS0zNWJmMDkzZWUxZDBAc29jaWFsVXNlci5jb20ifQ.jvz6sAwLI0V6n5T_Zr7JaUigx5JMi90vPZCaasZ5FvJqv_CPTMGOr8_fnG9JtuL1vUOmh1ZFjjiycSli0zI-CA";


  const [budget, setBudget] = useState('');
  const inputRef = useRef(null);
  const [buttonContainerStyle, setButtonContainerStyle] = useState(styles.modalContent);


  //여기 아래부터는 환율 알림 버튼 

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTextInputFocus = () => {
    inputRef.current.focus();
  };

  const handleTextChange = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setBudget(numericValue);
  };

  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  const handleAddButtonPress = () => {
    const formattedAmount = parseFloat(budget);
    const data = {
      currency: selectedCurrency,
      amount: formattedAmount
    };
    console.log(data.currency, data.amount);
  
  };

  return (
    <View style={styles.container}>
   
 {/* 환율알림버튼시작 */}
        <View style={styles.notificationButtonContainer}>
        
      <View style={[styles.sortIcon, { position: 'absolute', bottom: 20, right: 20 }]}>
        <TouchableOpacity onPress={handleIconPress} style={styles.bellButton}>
          <Ionicons name="md-notifications" size={24} color="#4974A5" />
        </TouchableOpacity>
      </View>
      
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={closeModal}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>알림 받을 환율을 설정하십시오</Text>
              <Text style={styles.modalSecondText}>설정한 환율 이하로 내려갈 경우 알림을 보내드려요</Text>
              <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.popupBox}>
                  <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="환율을 입력해주세요"
                    keyboardType="numeric"
                    onFocus={handleTextInputFocus}
                    onChangeText={handleTextChange}
                    value={budget}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.boxContainer}>
                <TouchableOpacity style={styles.leftbox} onPress={closeModal}>
                  <Text style={styles.leftboxText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightbox} onPress={() => {
                  handleAddButtonPress();
                  closeModal();
                }}>
                  <Text style={styles.rightboxText}>설정</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
        {/* 환율버튼알림 끝 */}
        
      </View> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  // 환율알림버튼 시작
  notificationButtonContainer:{
    position: 'absolute',
    top: 100,
   alignSelf: 'flex-end',
  },
  bellButtonContainer: {
    position: 'absolute',
   top: 10,
  alignSelf: 'flex-end',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#99B7DB',
    
  },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
    },
    modalText: {
    // fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 19,
    letterSpacing: 0.005,
    textAlign: 'center',
    top: 30,
    },
 popupBox: {
   top: 65,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: 250,
    height: 43,
    borderWidth: 1.5,
    borderColor: '#4974A5',
    borderRadius: 9,
    position: 'absolute',
    left: '-41%', // 수평 가운데 정렬을 위해 추가
},
modalSecondText: {
    top:50,
    // fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#71727A',
  },
  boxContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftbox: {
    width: 118,
    height: 40,
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: '#4974A5',
    borderWidth: 1.5,
    borderRadius: 9,
    marginRight: 15,
    marginLeft: 5,
    justifyContent: 'center',
   
  },
  rightbox: {
    width: 118,
    height: 40,
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#4974A5',
    borderRadius: 9,
    justifyContent: 'center',
  },
    leftboxText: {
    width: 23,
    height: 15,
    // fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 15,
    color: '#4974A5',
    flex: 0,
    flexGrow: 0,
    
  },
  rightboxText: {
    width: 23,
    height: 15,
    // fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 15,
    color: '#FFFFFF',
    flex: 0, 
    flexGrow: 0,
  },
   input: {
    flex: 1,
    // fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
    letterSpacing: 0.005,
    textAlign: 'left',
  },
  
});


export default AlarmCurrencyButton;


