import React, { useEffect, useState} from 'react';
import { 
  ScrollView,
  Image,
  Text, 
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
   } from 'react-native';
import Constants from 'expo-constants';
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

//type memberNcurrency = {
//  members: [],

//}


/*
async function fetchData() {
  try {
    const response = await fetch('http://172.30.1.16:5000/api/budget/trip/4/show', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      const members = data.member;
      const exchangeRate = data.exchangeRate;
      // Process the retrieved data
      console.log(data);
    } else {
      // Handle error responses
      const errorData = await response.json();
      console.log('Error(response-not okay):', errorData);
    }
  } catch (error) {
    // Handle network errors
    console.log('Error(fetchdata error):', error);
  }
};
*/


export default function App() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY4NTg4NjkyOSwiZW1haWwiOiIzNzMyOGRlZC04OGE0LTQ0MjQtYWZhYS0zNWJmMDkzZWUxZDBAc29jaWFsVXNlci5jb20ifQ.NrwnqemT5qtLWUqUwSbTZc4zxJ6Jb_wSpXgB3Jy4RoAmPgiBlDcYtNU0C2HdNqLteedsaFQ43azaskuRL5DEQg";

  const fetchData = async () => {
    try {
      const response = await axios.get('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/budget/trip/1/show', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        const data = response.data;
        const members = data.member;
        const exchangeRateMap = data.exchangeRate; 
  
        // Convert the exchangeRate Map to an array of key-value pairs
        const exchangeRateArray = Object.keys(exchangeRateMap);
  
        // Process the retrieved data
        console.log(data);
  
        // Update members, currencyTypes, and exchangeRate state variables with the retrieved data
        setMembers(members);
        setExchangeRates(exchangeRateArray);
      } else {
        // Handle error responses
        console.log('Error (response not okay):', response.data);
      }
    } catch (error) {
      // Handle network errors
      console.log('Error (fetchData error):', error);
    }
  };

  //fetchData();
  const [members, setMembers] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const paymethods = ["CREDIT", "CASH"];
  const cartegorys = ["숙소", "항공", "교통", "식비", "관광", "쇼핑", "기타"];
  const icons = {
    숙소 : "home",
    항공: "airplane",
    교통: "bus",
    식비: "ios-restaurant",
    관광: "images",
    쇼핑: "basket",
    기타: "apps",
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;

  const [description, onChangeDescription] = useState('');
  const [money, onChangeMoney] = useState();
  const [category, setCategory] = useState('');
  const [paymethod, setPaymethod] = useState(paymethods[0]);
  const [exchangeRate, setExchangeRate] = useState(exchangeRates[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPayWithPeople, setSelectedPayWithPeople] = useState([]);
  const [selectedSpendWithPeople, setSelectedSpendWithPeople] = useState([]);
  //console.log(selectedSpendWithPeople);

  const handlePayWithPress = (item) => {
    if (selectedPayWithPeople.includes(item)) {
      setSelectedPayWithPeople(selectedPayWithPeople.filter((selectedPayWithPeople) => selectedPayWithPeople !== item));
    } else {
        setSelectedPayWithPeople([...selectedPayWithPeople, item]);
    }
  };
  const renderPayWith = (item) => (
    <TouchableOpacity
      style={[
        styles.normalPeople,
        selectedPayWithPeople.includes(item) && styles.selectedPeople,
      ]}
      onPress={() => handlePayWithPress(item)}
      key={item}
    >
      <Text style={[styles.normalPPLText, selectedPayWithPeople.includes(item) && styles.selectedPPLText]}>{item}</Text>
    </TouchableOpacity>
  );

  const handleSpendWithPress = (item) => {
    if (selectedSpendWithPeople.includes(item)) {
      setSelectedSpendWithPeople(selectedSpendWithPeople.filter((selectedSpendWithPeople) => selectedSpendWithPeople !== item));
    } else {
        setSelectedSpendWithPeople([...selectedSpendWithPeople, item]);
    }
  };
  const renderSpendWith = (item) => (
    <TouchableOpacity
      style={[
        styles.normalPeople,
        selectedSpendWithPeople.includes(item) && styles.selectedPeople,
      ]}
      onPress={() => handleSpendWithPress(item)}
      key={item}
    >
      <Text style={[styles.normalPPLText, selectedSpendWithPeople.includes(item) && styles.selectedPPLText]}>{item}</Text>
    </TouchableOpacity>
  );

  const handleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setCategory('');
    } else {
      setSelectedCategory(category);
      setCategory(category);
    }
  };
  const renderCategory = (category) => (
    <TouchableOpacity
      style={[
        styles.categoryIcons,
        selectedCategory === category && styles.selectedCategory,
      ]}
      onPress={() => handleCategory(category)}
      key={category}
    >
      <Ionicons name={icons[category]} size={30} color={selectedCategory === category ? "#4974A5" : "#D4D6DD"} />
      <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategory,]}>{category}</Text>
    </TouchableOpacity>
  );

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const setAccountList = async () => {
    const formData = new FormData();
    formData.append('title', description);
    formData.append('nationMoney', money);
    formData.append('registerDate', formattedDate);
    formData.append('SpendWith', selectedSpendWithPeople);
    formData.append('WhoPay', selectedPayWithPeople);
    formData.append('type', paymethod);
    formData.append('category', category);
    formData.append('multiPartFile', {
      uri: image,
      type: 'image/jpeg', // Modify the type according to your requirements
      name: 'image.jpg',
    });
  
    try {
      const response = await axios.post('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/budget/trip/1/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  
    console.log('fetch end');
  };



  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>6월 26일</Text>
      </View>
      <ScrollView>
      <SelectDropdown
          data={exchangeRates}
          onSelect={(selectedItem) => {
            setExchangeRate(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}
          rowTextForSelection={(item) => {
            return item
          }}
          buttonStyle={styles.currencyButton}
          buttonTextStyle={styles.currencyButtonText}
          defaultValueByIndex={0}
          renderDropdownIcon={() => <Ionicons name="md-chevron-down-outline" size={20} color="#4974A5" />}
          dropdownIconPosition="right"
        />
      <SafeAreaView style={styles.money}>
        <TextInput 
        style={styles.inputMoney}
        onChangeText={onChangeMoney}
        value={money}
        keyboardType="numeric"
        />
        <SelectDropdown
          data={paymethods}
          onSelect={(selectedItem) => {
            setPaymethod(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}
          rowTextForSelection={(item) => {
            return item
          }}
          buttonStyle={styles.categoryButton}
          buttonTextStyle={styles.categoryButtonText}
          defaultValueByIndex={0}
          dropdownIconPosition="right"
          renderDropdownIcon={() => <Ionicons name="md-chevron-down-outline" size={20} color="#4974A5" />}
        />
      </SafeAreaView>

      <View style={{flex: 0.5, paddingVertical:10,}}>
        <Text style={styles.text}>카테고리</Text>
        <View style={styles.choose}>
          {cartegorys.map(renderCategory)}
        </View>
      </View>  

      <View>
        <Text style={styles.text}>설명</Text>
        <TextInput 
        style={styles.inputDescription}
        value={description}
        onChangeText={onChangeDescription}
        placeholder="글자 입력"
        />
      </View>


      <SafeAreaView style={{flex:0.5}}>
        <Text style={styles.text}>결제한 사람</Text>
        <View style={styles.choose}>
          {members.map(renderPayWith)}
        </View>
      </SafeAreaView>


      <SafeAreaView style={{flex:0.5}}>
        <Text style={styles.text}>함께 쓴 사람</Text>
        <View style={styles.choose}>
          {members.map(renderSpendWith)}
        </View>
      </SafeAreaView>


      <View style={styles.imageContainer}>
        <Text style={styles.text}>사진</Text>
        <View>
           <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }}  style={{ width: 200, height: 200 }}/>}
        </View>
      </View>
      </ScrollView>
    <TouchableOpacity 
      style={styles.endContainer}
      onPress={setAccountList}
      >
      <Text style={styles.endText}>등록하기</Text>
    </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  dateContainer: {
    flex: 0.5
  },
  dateText:{
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  currencyButton: {
    backgroundColor: 'white',
    width: 90,
  },
  money: {
    flex:0.6, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  inputMoney: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 12,
    fontSize: 30,
    borderRadius: 10,
    padding: 10,
    fontWeight: "bold",
  },
  categoryButton: {
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 12,
    width:110,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  categoryButtonText: {
    textAlign: 'left',
    fontSize: 15,
  },
  categoryIcons: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    //paddingTop: 10,
  },
  categoryText:{
    color: "#D4D6DD",
  },
  selectedCategory: {
    color: "#4974A5",
  },
  choose: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  normalPeople: {
    margin: 12,
    padding:10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0F7",
  },
  selectedPeople:{
    margin: 12,
    padding:10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4974A5",
  },
  normalPPLText:{
    color: "#4974A5",
    fontWeight: "bold",
  },
  selectedPPLText:{
    color: "#EAF0F7",
    fontWeight: "bold",
  },
  inputDescription: {
    paddingVertical: 15,
    margin: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    borderColor: "lightgrey",
  },
  text: {
    paddingHorizontal : 15,
    paddingVertical: 10,
    paddingTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 0.7,

  },
  endContainer:{
    flex: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#4974A5",
    borderRadius: 16,
    marginBottom: 15,
    alignContent: "center",
  },
  endText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 5,
  }
});
