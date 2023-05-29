import React, {useState} from 'react';
import { 
  Platform,
  fetch,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

//type memberNcurrency = {
//  members: [],

//}
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY4NTM1NTU2MSwiZW1haWwiOiJjZWUyN2IxYS1jZmY2LTRhYjEtYTIyZS03ZTMyZTRmYzQ4MTlAc29jaWFsVXNlci5jb20ifQ.BP17dgYXPILyS7kG129zdi38ISFfeYeKLegQOkw09BVdLEGIoNcPOTFzUISTq7n1nCiryKRc9WF28ZWdwE5K4Q";
async function fetchData() {
  try {
    const response = await axios.get('http://172.30.1.16:8080/api/budget/trip/4/show', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(response);

    if (response.status === 200) {
      const data = response.data;
      const members = data.member;
      const exchangeRate = data.exchangeRate;

      // Process the retrieved data
      console.log(data);
    } else {
      // Handle error responses
      console.log('Error(response-not okay):', response.data);
    }
  } catch (error) {
    // Handle network errors
    console.log('Error(fetchdata error):', error);
  }
};

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

  fetchData();
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState();
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPayWithPeople, setSelectedPayWithPeople] = useState([]);
  const [selectedSpendWithPeople, setSelectedSpendWithPeople] = useState([]);

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


  console.log(category);
  const pplname = ["규리뽀", "최호빵", "승재"];
  const paymethod = ["신용카드", "현금"];
  const cartegorys = ["숙소", "항공", "교통", "식비", "관광", "쇼핑", "기타"];
  const currencyTypes = ['USD', 'KRW'];
  const icons = {
    숙소 : "home",
    항공: "airplane",
    교통: "bus",
    식비: "ios-restaurant",
    관광: "images",
    쇼핑: "basket",
    기타: "apps",
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
/*
  const setSchedule = () => {
    fetch('http://172.30.1.16:8080/test/calendar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log("start date:", data.startDate);
        console.log("end date:", data.endDate);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("fetch end");
  };
*/



  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>6월 26일</Text>
      </View>
      <SelectDropdown
          data={currencyTypes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
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
        onChangeText={onChangeNumber}
        value={number}
        keyboardType="numeric"
        />
        <SelectDropdown
          data={paymethod}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
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
        value={text}
        onChangeText={onChangeText}
        placeholder="글자 입력"
        />
      </View>


      <SafeAreaView style={{flex:0.5}}>
        <Text style={styles.text}>결제한 사람</Text>
        <View style={styles.choose}>
          {pplname.map(renderPayWith)}
        </View>
      </SafeAreaView>


      <SafeAreaView style={{flex:0.5}}>
        <Text style={styles.text}>함께 쓴 사람</Text>
        <View style={styles.choose}>
          {pplname.map(renderSpendWith)}
        </View>
      </SafeAreaView>


      <View style={styles.imageContainer}>
        <Text style={styles.text}>사진</Text>
        <View>
           <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </View>

    <TouchableOpacity style={styles.endContainer}>
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
    flex: 0.2,
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
