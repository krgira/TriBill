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
  const [token, setToken] = useState('');
  console.log(token);

  const checkAsyncStorage = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      setToken(jwtToken || '');
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
  };

  const fetchData = async (token) => {
    try {
      const response = await axios.get('http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/trip/user/TravelList', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data); // Log the received data
  
        const tripLists = data;

        // Update members state variable with the retrieved names
        setTripList(tripLists);
      } else {
        // Handle error responses
        console.log('Error (response not okay):', response.data);
      }
    } catch (error) {
      // Handle network errors
      console.log('Error (fetchData error):', error);
    }
  };

  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    checkAsyncStorage();
    fetchData(token);
  }, []);

    return (
        <View style = {styles.container}>
            <ScrollView style={styles.lists}>
                {tripList && tripList.map(item => (
                    <View key={item.id} style={{ borderRadius: 5, borderWidth: 1, margin: 5, borderColor: '#e0e0e0' }}>
                        <List.Item
                        title={item.title}
                        description={item.nation.join(', ')}
                        left={props => (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            
                            </View>
                        )}
                        right={props => (
                            <View>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
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
    },
    lists: {
        flex: 1,
    },
});

export default MainListScreen;