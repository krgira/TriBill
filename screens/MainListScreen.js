import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text,  } from "react-native";
import { List,  } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


function MainListScreen () {
  const navigation = useNavigation();
  const route = useRoute();
  const [tripList, setTripList] = useState([]);

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

    return (
        <View style = {styles.container}>
            <ScrollView style={styles.lists}>
                {tripList && tripList.map(item => (
                    <View key={item.id} style={{ }}>
                        <List.Item
                        title={item.title}
                        description={item.nation.join(', ')}
                        left={props => (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            
                            </View>
                        )}
                        right={props => (
                          <View style={styles.rightArrow}>
                            <MaterialIcons name="arrow-forward-ios" size={20} color="#8F9098" />
                          </View>
                        )}
                        onPress={() => {
                          console.log(item.id); // Check if the navigation object is defined
                          navigation.navigate('Main', {id: item.id});
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
    lists: {
        flex: 1,
    },
    rightArrow:{
      justifyContent: 'center',
  },
});

export default MainListScreen;