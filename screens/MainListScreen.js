import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Alert,  } from "react-native";
import { List,  } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";


function MainListScreen () {
  const navigation = useNavigation();
  const route = useRoute();
  const [tripList, setTripList] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState();

  const fetchData = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      console.log(jwtToken);
  
      const response = await axios.get(
        'http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/trip/user/TravelList',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
  
      console.log(response);
  
      if (response.status === 200) {
        const tripLists = response.data;
        console.log(tripLists); // Log the received data
  
        // Update tripList state variable with the retrieved data
        setTripList(tripLists);
      } else {
        // Handle error responses
        console.log('Error (response not okay):', response.data);
      }
    } catch (error) {
      // Handle network errors or server-side errors
      console.log('Error:', error.response); // Log the error response
  
      // Check if the error response exists and display the error message
      if (error.response) {
        console.log('Error message:', error.response.data);
      } else {
        console.log('Network error:', error.message);
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (tripId) => {
    try {
      const response = await axios.delete(
        `http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/trip/user/Travel/${tripId}/delete`,
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

  const showDeleteConfirmation = (item) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete ${item.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setSelectedTrip(null); // Clear selected item
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteItem(item.id); // Call deleteItem function with budgetList ID
            fetchData();
            setSelectedTrip(null); // Clear selected item
          },
        },
      ]
    );
  };  
    return (
        <View style = {styles.container}>
          <View style={styles.header}>
            <Text>   </Text>
            <Text style={{fontWeight: 'bold'}}>나의 여행 리스트</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddInviteCode')}>
              <AntDesign name="addusergroup" size={24} color="#99B7DB" />
            </TouchableOpacity>
          </View>
            <ScrollView style={styles.lists}>
                {tripList && tripList.map(item => (
                    <View key={item.id} style={{ }}>
                        <List.Item
                        title={props => (
                            <Text style={{fontWeight: 'bold',}}>{item.title}</Text>
                        )}
                        description={props => (
                          <View style={{paddingVertical:5,}}>
                            <Text style={styles.description}>{item.nation.join(', ')}</Text>
                          </View>
                        )}
                        right={props => (
                          <View style={styles.rightArrow}>
                            <MaterialIcons name="arrow-forward-ios" size={20} color="#8F9098" />
                          </View>
                        )}
                        onPress={() => {
                          console.log(item.id); // Check if the navigation object is defined
                          navigation.navigate('Main', {id: item.id, title: item.title});
                        }}
                        onLongPress={() => {
                          setSelectedTrip(item); // Set selected item
                          showDeleteConfirmation(item); // Show delete confirmation
                        }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 15,
      marginTop:'4%',
      borderBottomColor: 'lightgrey',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    lists: {
        flex: 1,
    },
    description:{
      color: "grey",
      fontSize: 13,
    },
    rightArrow:{
      justifyContent: 'center',
  },
});

export default MainListScreen;