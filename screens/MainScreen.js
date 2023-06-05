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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import MainCalender from '../components/MainCalender';
import FloatingWriteButton from '../components/FloatingWriteButton';



function MainScreen() {
  const navigation = useNavigation();
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY4NTk3NzM2MywiZW1haWwiOiIzNzMyOGRlZC04OGE0LTQ0MjQtYWZhYS0zNWJmMDkzZWUxZDBAc29jaWFsVXNlci5jb20ifQ.DlLlQcLYjPeEj0fSs9J7yjDCppDrhVwOVUBM85MkGy8UJ1x8BB-jLy1RQb41_QK7NEO4WTdciB1IuLc9M02Elg";
  const fetchData = async () => {
    try {
      const response = await axios.get('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/budget/trip/1/details?userName=이승재/학생/컴퓨터공학', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data); // Log the received data
  
        const userList = data.userList;
        const budgetList = data.budgetList;
  
        const names = userList.map(user => user.name);
        console.log(names); // Log the extracted names
  
        // Update members state variable with the retrieved names
        setMember(names);
        setAccountList(budgetList);
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

  const [member, setMember] = useState([]);
  const [accountList, setAccountList] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedMember, setSelectedMember] = useState(member[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();


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
      style={{ paddingHorizontal: 10, alignItems: "center", justifyContent: "center"}}
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
    <View style={styles.container}>

      <View style={styles.memberContainer}>
      <ScrollView horizontal>
        <View style={{flexDirection: "row"}}>
          {member && member.map(renderMember)}
        </View>
        <TouchableOpacity>
          <Ionicons style={styles.addButton} name="add-circle-outline" size={50} color="black" />
          <Text>   </Text>
        </TouchableOpacity>
      </ScrollView>
      </View>

      <View style={styles.calender}>
        <MainCalender />
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

      <View>
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
    flex: 0.3,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  unselectedMem: {
    padding: 20,
    borderRadius:50,
    backgroundColor: "grey",
  },
  selectedMem: {
    padding: 20,
    borderRadius:50,
    backgroundColor: "tomato",
  },
  unselectedMemTXT: {
    paddingVertical: 5,
  },
  selectedMemTXT: {
    paddingVertical: 5,
    fontWeight: "bold",
  },
  addButton:{
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  calender: {
    flex: 1,
  },
  lists: {
    flex: 1,
  }
});

export default MainScreen;