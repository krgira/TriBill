import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get("window").width;

function CurrencyView() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Rainy Days"]
  };

const formatCurrency = (value) => {
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

  /*useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = () => {
    fetch('/api/exchange-rate/', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setExchangeRate(data.exchange_rate);
        setUsdAmount(data.exchange_rate * krwAmount);
      })
      .catch(error => {
        console.error('Error fetching exchange rate:', error);
      });
  };*/

  const [activeButton, setActiveButton] = useState('krw');

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`${buttonName} button pressed`);

    if (buttonName === 'krw') {
      setKrwAmount(1);
      if (exchangeRate !== 0) {
        setUsdAmount((1 / exchangeRate).toFixed(6));
      } else {
        setUsdAmount(0);
      }
    } else if (buttonName === 'usd') {
       setUsdAmount(1);
      if (exchangeRate !== 0) {
        setKrwAmount(1 * exchangeRate);
      } else {
        setKrwAmount(0);
      }
     
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

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "pink"
          }
        }}
      />

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
            activeButton === 'usd' ? { backgroundColor: '#99B7DB' } : null
          ]}
          onPress={() => handleButtonPress('usd')}
        >
          <Text style={[styles.buttonText, styles.auxiliaryButtonText]}>USD</Text>
          <Text style={styles.buttonAmount}>${formatCurrency(usdAmount)}</Text>
        </TouchableOpacity>
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
  },
  auxiliaryButtonText: {
    color: '#333333',
  },
  reduceGap: {
    marginHorizontal: 1,
  },
  centerButton: {
    alignSelf: 'center',
  },
  sortIcon: {
    width: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrencyView;
