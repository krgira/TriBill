import React, {useState, useEffect} from "react";
import { 
  View,
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import axios from 'axios';
import "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CalendarList } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import FloatingWriteButton from '../components/FloatingWriteButton';



function MainScreen() {
  //const navigation = useNavigation();
  //const route = useRoute();
  //const {id} = route.params;

  const getFonts = async () => {
    await Font.loadAsync({
      Inter_SemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    });
  };

  const fetchData = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      console.log(jwtToken);

      const response = await axios.get(`http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/budget/trip/${id}/details?userName=이승재/학생/컴퓨터공학`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data); // Log the received data
  
        const userList = data.userList;
        const budgetList = data.budgetList;
        const startDate = data.startDate;
        const endDate = data.endDate;
  
        const names = userList.map(user => user.name);
        console.log(names); // Log the extracted names
  
        // Update members state variable with the retrieved names
        setMember(names);
        setAccountList(budgetList);
        setStartDate(startDate);
        setEndDate(endDate);
      } else {
        // Handle error responses
        console.log('Error (response not okay):', response.data);
      }
    } catch (error) {
      // Handle network errors
      console.log('Error (fetchData error):', error);
    }
  };
  
  const deleteItem = async (budgetListId) => {
    try {
      const response = await axios.delete(
        `http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/budget/delete?id=${budgetListId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
  
      if (response.status === 200) {
        // Item deleted successfully, perform any additional actions if needed
      } else {
        // Handle error responses
        console.log('Error (response not okay):', response.data);
      }
    } catch (error) {
      // Handle network errors
      console.log('Error (deleteItem error):', error);
    }
  };

  //const [member, setMember] = useState([]);
  const [accountList, setAccountList] = useState();
  const member = ['dlt', 'asd'];    // 임시멤버 곧 삭제

  useEffect(() => {
    //fetchData();
  }, []);

  const [selectedMember, setSelectedMember] = useState(member[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const selectedDates = {};

  if (startDate && endDate) {
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      selectedDates[dateString] = { selected: true, selectedColor: '#CBDAEC', selectedTextColor: 'black' };
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const showDeleteConfirmation = (item) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete ${item.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setSelectedItem(null); // Clear selected item
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteItem(item.id); // Call deleteItem function with budgetList ID
            fetchData();
            setSelectedItem(null); // Clear selected item
          },
        },
      ]
    );
  };  

  const handleMemberPress = (item) => {
    setSelectedMember(item);
  };

  const renderMember = (item) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10, 
        alignItems: "center", 
        justifyContent: "center",
      }}
      onPress={() => handleMemberPress(item)}
      key={item}
    >
      <View style={[
        styles.unselectedMem,
        selectedMember === item && styles.selectedMem,
      ]}/>
      <Text style={[styles.unselectedMemTXT, selectedMember === item && styles.selectedMemTXT]}>{item}</Text>
    </TouchableOpacity>
  );

  return(
    <View 
      style={styles.container}
      startAsync={getFonts}>

      <View style={styles.memberContainer}>
        <ScrollView horizontal style={{borderWidth:1,}}>
          <View style={{flexDirection: "row"}}>
            {member && member.map(renderMember)}
          </View>
          
        </ScrollView>
        <TouchableOpacity 
            onPress={() => {
              navigation.navigate('ShowInviteCode', {id: id});
            }}
            style={styles.addFriendbg}
            >
            <Ionicons name="add" size={30} color="#99B7DB" />
          </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <CalendarList 
          pagingEnabled 
          horizontal
          markedDates={selectedDates}
          textStyle={styles.selectedText}
          hideArrows={false}
          theme={{
            todayTextColor: '#6D8FB7',
          }}
        />
      </View>


      <ScrollView style={styles.lists}>
        {accountList && accountList.map(item => (
          <View key={item.id} style={{ borderRadius: 5, borderWidth: 1, margin: 5, borderColor: '#e0e0e0' }}>
            <List.Item
              title={item.title}
              description={""}
              left={props => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar.Image size={50} source={{ uri: item.imageUri }} />
                </View>
              )}
              right={props => (
                <View>
                  <Text>{item.nationMoney}</Text>
                  <Text>{item.kmoney}</Text>
                </View>
              )}
              onPress={() => {
                navigation.navigate('MainUpdate', { itemId: item.id });
              }}
              onLongPress={() => {
                setSelectedItem(item); // Set selected item
                showDeleteConfirmation(item); // Show delete confirmation
              }}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.floatingbtn}>
        <FloatingWriteButton />
      </View>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  memberContainer: {
    flex: 0.5,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  unselectedMem: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#EAF0F7",
  },
  selectedMem: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#CBDAEC",
  },
  unselectedMemTXT: {
    paddingVertical: 5,
    flexShrink: 1,
  },
  selectedMemTXT: {
    paddingVertical: 5,
    fontWeight: "bold",
    flexShrink: 1,
  },
  addButton:{
    //paddingHorizontal: 5,
    //paddingBottom: 10,
  },
  addFriendbg: {
    backgroundColor: "#EAF0F7",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
  },
  calendar: {
    flex: 2,
  },
  selectedText: {
    color: 'black',
    fontFamily: 'Inter_SemiBold',
    // Add any additional styles for the selected dates' text if needed
  },
  lists: {
    flex: 1,
  },
  floatingbtn:{
    flex: 0.5,
  },
});

export default MainScreen;