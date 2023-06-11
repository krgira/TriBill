import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList, Modal,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

function ChangeCurrencyButton({ onSelectCurrency }) {

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY4NTg4NzkwNCwiZW1haWwiOiIzNzMyOGRlZC04OGE0LTQ0MjQtYWZhYS0zNWJmMDkzZWUxZDBAc29jaWFsVXNlci5jb20ifQ.jvz6sAwLI0V6n5T_Zr7JaUigx5JMi90vPZCaasZ5FvJqv_CPTMGOr8_fnG9JtuL1vUOmh1ZFjjiycSli0zI-CA";

  const [krwAmount, setKrwAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [activeButton, setActiveButton] = useState('krw');
  const [currencyList, setCurrencyList] = useState([]);
  const [showCurrencyList, setShowCurrencyList] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  

  const handleCurrencySelection = () => {
    onSelectCurrency(selectedCurrency);
  };

  const fetchExchangeRate = async (selectedCurrency) => {
    try {
      const response = await axios.get(`http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/currency/v1?Nation=${selectedCurrency}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = response.data;
      const currencyKeys = data.nation;
      const exchangeRate = data.rate;
  
      console.log(currencyKeys);
      console.log(exchangeRate);
  
      setExchangeRate(exchangeRate);
    } catch (error) {
      console.log('환율을 가져오는 중 오류 발생:', error);
    }
  };
  
useEffect(() => {
  fetchExchangeRate(selectedCurrency);
  
}, []);
useEffect(() => {
  if (selectedCurrency !== 'krw') {
    setKrwAmount((1 / exchangeRate).toFixed(6));
    setUsdAmount(`1 (${exchangeRate})`);
    setActiveButton('USD');
    setShowCurrencyList(!showCurrencyList);
    createList();
  }
  
}, [exchangeRate]);

const formatCurrency = (value) => { // 0이하면 소수점 여섯째 자리까지, 1이상이면 소수점 둘째 자리까지 
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

const handleButtonPress = async (buttonName) => {
  if (buttonName === 'krw') {
    setActiveButton('krw');
    setKrwAmount(1);
    setUsdAmount((1 * exchangeRate).toFixed(6)); 
    setShowCurrencyList(false);
  } else {
    setSelectedCurrency(buttonName);
    await fetchExchangeRate(buttonName);
    
  }
};

const createList =  () => {
  
  const newList =[
  {"buttonName": "USD"},
  {"buttonName": "EUR"},
  {"buttonName": "JPY"},
  {"buttonName": "GBP"},
  {"buttonName": "CAD"},
  {"buttonName": "AUD"},
  {"buttonName": "GHS"},
  {"buttonName": "GNF"},
  {"buttonName": "GMD"},
  {"buttonName": "GYD"},
  {"buttonName": "GGP"},
  {"buttonName": "XDR"},
  {"buttonName": "GRC"},
  {"buttonName": "GTQ"},
  {"buttonName": "ANG"},
  {"buttonName": "NOK"},
  {"buttonName": "NAD"},
  {"buttonName": "SSP"},
  {"buttonName": "NGN"},
  {"buttonName": "ZAR"},
  {"buttonName": "NZD"},
  {"buttonName": "NIO"},
  {"buttonName": "NLD"},
  {"buttonName": "NPR"},
  {"buttonName": "TWD"},
  {"buttonName": "DOP"},
  {"buttonName": "DKK"},
  {"buttonName": "FOK"},
  {"buttonName": "XCD"},
  {"buttonName": "RON"},
  {"buttonName": "LBP"},
  {"buttonName": "LYD"},
  {"buttonName": "RUB"},
  {"buttonName": "LSL"},
  {"buttonName": "RWF"},
  {"buttonName": "LRD"},
  {"buttonName": "LAK"},
  {"buttonName": "MNT"},
  {"buttonName": "MGA"},
  {"buttonName": "MDL"},
  {"buttonName": "MVR"},
  {"buttonName": "MUR"},
  {"buttonName": "MWK"},
  {"buttonName": "MYR"},
  {"buttonName": "MAD"},
  {"buttonName": "MRU"},
  {"buttonName": "IMP"},
  {"buttonName": "MXN"},
  {"buttonName": "MMK"},
  {"buttonName": "MZN"},
  {"buttonName": "MOP"},
  {"buttonName": "BDT"},
  {"buttonName": "BGN"},
  {"buttonName": "VES"},
  {"buttonName": "VUV"},
  {"buttonName": "BND"},
  {"buttonName": "BIF"},
  {"buttonName": "BYN"},
  {"buttonName": "BOB"},
  {"buttonName": "BHD"},
  {"buttonName": "BRL"},
  {"buttonName": "BZD"},
  {"buttonName": "BMD"},
  {"buttonName": "MKD"},
  {"buttonName": "BBD"},
  {"buttonName": "BAM"},
  {"buttonName": "BWP"},
  {"buttonName": "BTN"},
  {"buttonName": "VND"},
  {"buttonName": "BSD"},
  {"buttonName": "SGD"},
  {"buttonName": "SDG"},
  {"buttonName": "SRD"},
  {"buttonName": "LKR"},
  {"buttonName": "SBD"},
  {"buttonName": "RSD"},
  {"buttonName": "SYP"},
  {"buttonName": "SOS"},
  {"buttonName": "WST"},
  {"buttonName": "XOF"},
  {"buttonName": "SEK"},
  {"buttonName": "SAR"},
  {"buttonName": "SLE"},
  {"buttonName": "SLL"},
  {"buttonName": "CHF"},
  {"buttonName": "SCR"},
  {"buttonName": "SZL"},
  {"buttonName": "SHP"},
  {"buttonName": "STN"},
  {"buttonName": "UGX"},
  {"buttonName": "AOA"},
  {"buttonName": "INR"},
  {"buttonName": "IDR"},
  {"buttonName": "HNL"},
  {"buttonName": "IRR"},
  {"buttonName": "UYU"},
  {"buttonName": "JOD"},
  {"buttonName": "AMD"},
  {"buttonName": "AWG"},
  {"buttonName": "AED"},
  {"buttonName": "IQD"},
  {"buttonName": "ERN"},
  {"buttonName": "ARS"},
  {"buttonName": "OMR"},
  {"buttonName": "YER"},
  {"buttonName": "ALL"},
  {"buttonName": "ILS"},
  {"buttonName": "ISK"},
  {"buttonName": "HTG"}
];
  setCurrencyList(newList);
}


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
      <View style={styles.conversionButtonContainer}>
        <View //krw버튼
          style={[
            styles.button,
            styles.centerButton,
            activeButton === 'krw' ? { backgroundColor: '#99B7DB' } : null
          ]}
           onPress={() => handleButtonPress('krw')}
        >
          <Text style={styles.buttonText}>KRW</Text>
          <Text style={styles.buttonAmount}>{formatCurrency(krwAmount)}</Text>
        </View>
        
        {/* 양방향 화살표 */}
        <View style={[styles.sortIcon, { top: 20, left: 175 }]}>
  <Icon name="ios-swap-horizontal" size={24} color="#333333" />
</View>


        <TouchableOpacity //usd 버튼
          style={[
            styles.button,
            styles.auxiliaryButton,
            styles.reduceGap,
            styles.centerButton,
            activeButton === 'USD' ? { backgroundColor: '#99B7DB' } : null
          ]}
          onPress={() => {
            // handleButtonPress('USD');
            setActiveButton('USD');
            createList;
            setShowCurrencyList(!showCurrencyList);
          }}
        >
          <Text style={[styles.buttonText, styles.auxiliaryButtonText]}>
            {selectedCurrency !== '' ? selectedCurrency : 'USD'}
          </Text>
          <Text style={styles.buttonAmount}>{(usdAmount)}</Text>
        </TouchableOpacity>

        {/* currencyList 표시 */}
      {showCurrencyList && (
        <ScrollView style={styles.currencyList}>
          {currencyList.map((currency, index) => (
          <TouchableOpacity
            key={index} 
            style={styles.currencyItem} 
            onPress={() => {handleButtonPress(currency.buttonName); }}>
              <Text style={styles.currencyText}>{currency.buttonName}</Text>
          </TouchableOpacity>
          ))}
        </ScrollView>
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
  conversionButtonContainer: {
    top:200,
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

  // 환율알림버튼 시작
//   notificationButtonContainer:{
//     position: 'absolute',
//     top: 80,
//    alignSelf: 'flex-end',
//   },
//   bellButtonContainer: {
//     position: 'absolute',
//    top: 10,
//   alignSelf: 'flex-end',
//   },
//   bellButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#99B7DB',
    
//   },
//    modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//       width: 300,
//       height: 250,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 16,
//       backgroundColor: '#FFFFFF',
//     },
//     modalText: {
//     // fontFamily: 'Inter',
//     fontSize: 16,
//     fontWeight: '900',
//     lineHeight: 19,
//     letterSpacing: 0.005,
//     textAlign: 'center',
//     top: 30,
//     },
//  popupBox: {
//    top: 65,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 12,
//     paddingHorizontal: 16,
//     marginVertical: 8,
//     width: 250,
//     height: 43,
//     borderWidth: 1.5,
//     borderColor: '#4974A5',
//     borderRadius: 9,
//     position: 'absolute',
//     left: '-41%', // 수평 가운데 정렬을 위해 추가
// },
// modalSecondText: {
//     top:50,
//     // fontFamily: 'Inter',
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 16,
//     letterSpacing: 0.01,
//     textAlign: 'center',
//     color: '#71727A',
//   },
//   boxContainer:{
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   leftbox: {
//     width: 118,
//     height: 40,
//     padding: 12,
//     paddingLeft: 16,
//     paddingRight: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     borderColor: '#4974A5',
//     borderWidth: 1.5,
//     borderRadius: 9,
//     marginRight: 15,
//     marginLeft: 5,
//     justifyContent: 'center',
   
//   },
//   rightbox: {
//     width: 118,
//     height: 40,
//     padding: 12,
//     paddingLeft: 16,
//     paddingRight: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     backgroundColor: '#4974A5',
//     borderRadius: 9,
//     justifyContent: 'center',
//   },
//     leftboxText: {
//     width: 23,
//     height: 15,
//     // fontFamily: 'Inter',
//     fontWeight: 'bold',
//     fontSize: 14,
//     lineHeight: 15,
//     color: '#4974A5',
//     flex: 0,
//     flexGrow: 0,
    
//   },
//   rightboxText: {
//     width: 23,
//     height: 15,
//     // fontFamily: 'Inter',
//     fontWeight: 'bold',
//     fontSize: 14,
//     lineHeight: 15,
//     color: '#FFFFFF',
//     flex: 0, 
//     flexGrow: 0,
//   },
//    input: {
//     flex: 1,
//     // fontFamily: 'Inter',
//     fontSize: 16,
//     fontWeight: '900',
//     lineHeight: 21,
//     letterSpacing: 0.005,
//     textAlign: 'left',
//   },
  
});


export default ChangeCurrencyButton;


