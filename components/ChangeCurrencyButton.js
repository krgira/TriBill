import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, FlatList, Modal,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const screenWidth = Dimensions.get("window").width;

function ChangeCurrencyButton() {
  const formatCurrency = (value) => {
    if (typeof value !== 'number') {
      value = parseFloat(value);
    }

    if (isNaN(value)) {
      return '';
    }

    if (value > 0) {
      if (value % 1 !== 0) {
        return value.toFixed(2);
      } else {
        return value.toFixed(0);
      }
    } else {
      return value.toFixed(6);
    }
  };

  const [krwAmount, setKrwAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [activeButton, setActiveButton] = useState('krw');
  const [showCurrencyList, setShowCurrencyList] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isListExpanded, setListExpanded] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
const [budget, setBudget] = React.useState('');
const [buttonContainerStyle, setButtonContainerStyle] = useState(styles.buttonContainer);
const [amount, setAmount] = useState('');


  useEffect(() => {
    fetchExchangeRate();
  }, []);

const fetchExchangeRate = () => {
  axios.get('http://ec2-52-79-233-82.ap-northeast-2.compute.amazonaws.com:8001/api/currency/v1?Nation=베트남')
    .then(response => {
      console.log(response); // response 객체를 콘솔에 출력합니다.
      return response.data; // 다음 then 메서드로 response.data를 전달합니다.
    })
    .then(data => {
      const currencyKeys = Object.keys(data);
      setExchangeRate(data);
      setUsdAmount(data[selectedCurrency] * krwAmount);
      setCurrencyList(currencyKeys);
    })
    .catch(error => {
      console.error('환율을 가져오는 중 오류 발생:', error);
    });
};

  

  const handleButtonPress = (buttonName) => {
    if (buttonName === 'krw') {
      setActiveButton('krw');
      setKrwAmount(1);
      setUsdAmount((1 * exchangeRate[selectedCurrency]).toFixed(6));
      setListExpanded(false);
      setShowCurrencyList(false);
    } else if (buttonName === 'usd') {
      setActiveButton('usd');
      setUsdAmount(1);
      setKrwAmount((1 / exchangeRate[selectedCurrency]).toFixed(6));
      setListExpanded(!isListExpanded);
      setShowCurrencyList(!showCurrencyList);
    }

    sendButtonNameToServer(buttonName);
  };

const sendButtonNameToServer = (buttonName) => {
  axios.post('http://ec2-52-79-233-82.ap-northeast-2.compute.amazonaws.com:8001/api/currency/v1?Nation=베트남', { buttonName })
    .then(response => {
      console.log('Button name sent to server:', buttonName);
    })
    .catch(error => {
      console.error('Error sending button name to server:', error);
    });
};


  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity style={styles.currencyItem} onPress={() => handleCurrencySelect(item)}>
      <Text style={styles.currencyText}>{item}</Text>
    </TouchableOpacity>
  );

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setListExpanded(false);
    setShowCurrencyList(false);

    if (activeButton === 'krw') {
      setUsdAmount(1);
      setKrwAmount((1 / exchangeRate[currency]).toFixed(6));
    } else if (activeButton === 'usd') {
      setKrwAmount(1);
      setUsdAmount((1 * exchangeRate[currency]).toFixed(6));
    }
  };

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
    const numericValue = value.replace(/[^0-9]/g, '');
    setBudget(numericValue);
  };

  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  const handleAddButtonPress = () => {
  const formattedAmount = parseFloat(amount);
  const data = {
    currency: selectedCurrency,
    amount: formattedAmount
  };

  axios.post('http://ec2-52-79-233-82.ap-northeast-2.compute.amazonaws.com:8001/api/currency/v1?Nation=베트남', data)
    .then(response => {
      console.log('서버 응답:', response.data);
    })
    .catch(error => {
      console.error('서버 요청 오류:', error);
    });
};

  
  

    React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
    Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide);
    };
  }, []);
const handleKeyboardWillShow = () => {
  setButtonContainerStyle({...styles.buttonContainer, top: 150});
};

const handleKeyboardWillHide = () => {
  setButtonContainerStyle(styles.buttonContainer);
};


 const inputRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.centerButton,
            activeButton === 'krw' ? { backgroundColor: '#99B7DB' } : null
          ]}
          onPress={() => handleButtonPress('krw')}
        >
          <Text style={styles.buttonText}>KRW</Text>
          <Text style={styles.buttonAmount}>{formatCurrency(krwAmount)}</Text>
        </TouchableOpacity>
        



        <View style={[styles.sortIcon, { top: 20, left: 182 }]}>
  <Icon name="ios-swap-horizontal" size={24} color="#333333" />
</View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.auxiliaryButton,
            styles.reduceGap,
            styles.centerButton,
            activeButton === 'usd' ? { backgroundColor: '#99B7DB' } : null
          ]}
          onPress={() => {
            handleButtonPress('usd');
            setShowCurrencyList(!showCurrencyList);
          }}
        >
          <Text style={[styles.buttonText, styles.auxiliaryButtonText]}>
            {selectedCurrency !== '' ? selectedCurrency : 'USD'}
          </Text>
          <Text style={styles.buttonAmount}>{formatCurrency(usdAmount)}</Text>
        </TouchableOpacity>
        

        <View style={[styles.sortIcon, { position: 'absolute', bottom: 20, right: 20 }]}>
        <View style={styles.bellButtonContainer}>
                <View style={[styles.sortIcon, { position: 'absolute', bottom: 20, right: 20 }]}>
  <TouchableOpacity onPress={handleIconPress} style={styles.bellButton}>
    <Ionicons name="md-notifications" size={24} color="#4974A5" />
  </TouchableOpacity>
</View> 
</View>
 <View>
      <TouchableOpacity onPress={handleIconPress}>
      </TouchableOpacity>
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalContainer}
        onPress={closeModal}
      >
      <TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>알림 받을 환율을 설정하십시오</Text>
<Text style={styles.modalSecondText}>설정한 환율 이하로 내려갈 경우
알림을 보내드려요 </Text>

<KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.popupBox}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="환율을 입력해주세요"
            keyboardType="numeric"
            onFocus={handleTextInputFocus}
           onChangeText={setAmount}
             value={amount}
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


        </View>

        {showCurrencyList && (
          <FlatList
            data={currencyList}
            renderItem={renderCurrencyItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.currencyList}
            numColumns={1}
          />
        )}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 150,
    marginBottom: 20,
  },
  button: {
    width: 140,
    height: 60,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#99B7DB',
  },
  buttonText: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonAmount: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  auxiliaryButton: {
    backgroundColor: '#fff',
    width: 140,
    height: 60,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#99B7DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  auxiliaryButtonText: {
    fontSize: 20,
  },
  reduceGap: {
    marginLeft: 5,
  },
  sortIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  centerButton: {
    marginRight: 5,
  },
  currencyList: {
    position: 'absolute',
    top: 53,
    right: 25,
    width: 140,
    maxHeight: 120,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#99B7DB',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
  },
  currencyItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#99B7DB',
  },
  currencyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
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
    fontFamily: 'Inter',
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
    fontFamily: 'Inter',
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
    fontFamily: 'Inter',
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
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 15,
    color: '#FFFFFF',
    flex: 0, 
    flexGrow: 0,
  },
   input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
    letterSpacing: 0.005,
    textAlign: 'left',
  },
  
});

export default ChangeCurrencyButton;
