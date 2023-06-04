import React, {useState} from "react";
import { 
  View,
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { List, Button, Avatar } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

import MainCalender from '../components/MainCalender';
import FloatingWriteButton from '../components/FloatingWriteButton';

const stack = createStackNavigator();


function MainScreen({navigation}) {
  const pplname = ["규리뽀", "최호빵", "승재"];
  const [selectedMember, setSelectedMember] = useState(pplname[0]);
  const currency = 0.5;
  const data = [
    {
      id: 1,
      title: "Item 1",
      description: "Description for Item 1",
      imageUri: "https://example.com/image1.jpg",
      money: 500,
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description for Item 2",
      imageUri: "https://example.com/image2.jpg",
      money: 200,
    },
    // Add more items as needed
  ];

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
          {pplname.map(renderMember)}
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
        {data.map(item => (
          <View key={item.id} style={{ borderRadius: 5, borderWidth: 1, margin: 5, borderColor: '#e0e0e0' }}>
            <List.Item
              title={item.title}
              description={item.description}
              left={props => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar.Image size={50} source={{ uri: item.imageUri }} />
                </View>
              )}
              right={props => (
                <View>
                  <Text>{item.money}</Text>
                  <Text>{item.money * currency}</Text>
                </View>
              )}
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