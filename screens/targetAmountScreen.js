import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Field = () => {
  const [budget, setBudget] = React.useState('');
  const [showCurrency, setShowCurrency] = React.useState(false);
  const [buttonContainerStyle, setButtonContainerStyle] = React.useState(styles.buttonContainer);

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

  const handleAddButtonPress = () => {
    const formattedBudget = `₩${budget}`;
    console.log(formattedBudget);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);
    Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);

    // Clean up listeners
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
          <TouchableOpacity style={styles.laterButton}>
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

export default Field;
