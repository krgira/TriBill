import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get("window").width;

function CurrencyView() {
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

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = () => {
    fetch('/api/exchange-rate', { method: 'GET' })
      .then(response => response.json())
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
    fetch('/api/button-press', {
      method: 'POST',
      body: JSON.stringify({ buttonName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
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
          <Text style={styles.buttonAmount}>₩{formatCurrency(krwAmount)}</Text>
        </TouchableOpacity>

        <View style={[styles.sortIcon, { top: 25, left: 182 }]}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </View>

        <View style={[styles.sortIcon, { bottom: 27, right: 185 }]}>
          <Icon name="arrow-forward" size={24} color="#333333" />
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
          <Text style={styles.buttonAmount}>${formatCurrency(usdAmount)}</Text>
        </TouchableOpacity>

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
});

export default CurrencyView;
