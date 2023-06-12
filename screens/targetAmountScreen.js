import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function TargetAmountScreen() {
  const [budget, setBudget] = React.useState('');
  const [showCurrency, setShowCurrency] = React.useState(false);
  const [buttonContainerStyle, setButtonContainerStyle] = React.useState(styles.buttonContainer);
  const [tripId, setTripId] = React.useState();
  const navigation = useNavigation();

  // Retrieve the savedId value from AsyncStorage
  AsyncStorage.getItem('tripId')
  .then(tripIdString => {
    if (tripIdString !== null) {
      const tripId = parseInt(tripIdString, 10);

      setTripId(tripId);
      //console.log('Retrieved ID (schdule screen):', tripId);
      // Use the savedId value as needed in the other screen
    } else {
      // Handle the case when savedId is not found in AsyncStorage
    }
  })
  .catch(error => {
    console.error('Error retrieving ID:', error);
  });




  const handleTextInputFocus = () => {
    inputRef.current.focus();
  };

  const handleTextChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setBudget(numericValue);
    setShowCurrency(Boolean(numericValue));
  };

  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  const handleLaterButtonPress = () => {
    navigation.navigate("MainTab");
  };

  const handleAddButtonPress = () => {
    setTarget(tripId);
    navigation.navigate("MainTab");
  };

  const inputRef = React.useRef(null);
  const amount = parseFloat(budget);

const setTarget = (tripId) => {
  axios.post(`http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/trip/${tripId}/create/amount`, {
    amount: amount,
  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(error => {
      console.error('Error setting target:', error);
    });

  console.log("TargetAmount Fetch end");
};


  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container}>
        <Text style={styles.heading}>여행 예산 설정</Text>
        <View style={styles.fieldContainer}>
          {showCurrency && <Text style={styles.currencySymbol}>₩</Text>}
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="금액을 입력해주세요"
            keyboardType="numeric"
            onFocus={handleTextInputFocus}
            onChangeText={handleTextChange}
            value={budget}
          />
        </View>
        <View style={buttonContainerStyle}>
          <TouchableOpacity style={styles.laterButton} onPress={handleLaterButtonPress}>
            <Text style={styles.laterButtonText}>나중에</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
            <Text style={styles.addButtonText}>설정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 300,
    backgroundColor: 'white',
  },
  fieldContainer: {
    top: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: 327,
    height: 48,
    borderWidth: 1.5,
    borderColor: '#4974A5',
    borderRadius: 12,
    position: 'relative',
  },
  heading: {
    marginTop: -90,
    // fontFamily: 'Inter',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 27,
    letterSpacing: 0.005,
    textAlign: 'center',
    color: '#1F2024',
    width: '100%',
  },
  currencySymbol: {
    // fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
    letterSpacing: 0.005,
    textAlign: 'left',
    marginRight: 8,
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
  buttonContainer: {
    top: 350,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
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

export default TargetAmountScreen;
