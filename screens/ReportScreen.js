import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView,
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native';
import { List,  } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const screenWidth = Dimensions.get("window").width;

function ReportScreen() {
    const route = useRoute();
    const {title} = route.params;
    const {id} = route.params;

    const [accommodation, setAccomodation] = useState(0);
    const [flight, setFlight] = useState(0);
    const [food, setFood] = useState(0);
    const [transportation, setTransportation] = useState(0);
    const [shopping, setShopping] = useState(0);
    const [sightseeing, setSightseeing] = useState(0);
    const [others, setOthers] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [restMoney, setRestMoney] = useState(0);

    const tripList = [
        {
            id: 1,
            category: "숙소",
            percentage: (accommodation / totalMoney) * 100,
            money: accommodation,
        },
        {
            id: 2,
            category: "항공",
            percentage: (flight / totalMoney) * 100,
            money: flight,
        },
        {
            id: 3,
            category: "교통",
            percentage: (transportation / totalMoney) * 100,
            money: transportation,
        },
        {
            id: 4,
            category: "식비",
            percentage: (food / totalMoney) * 100,
            money: food,
        },
        {
            id: 5,
            category: "쇼핑",
            percentage: (shopping / totalMoney) * 100,
            money: shopping,
        },
        {
            id: 6,
            category: "관광",
            percentage: (sightseeing / totalMoney) * 100,
            money: sightseeing,
        },
        {
            id: 7,
            category: "기타",
            percentage: (others / totalMoney) * 100,
            money: others,
        },
    ];
    

    const data = [
        {
          name: "숙소",
          money: accommodation,
          color: "#14B8A6",
          legendFontColor: "#404040",
          legendFontSize: 13
        },
        {
          name: "항공",
          money: flight,
          color: "#3B82F6",
          legendFontColor: "#404040",
          legendFontSize: 13
        },
        {
          name: "교통",
          money: transportation,
          color: "#6366F1",
          legendFontColor: "#404040",
          legendFontSize: 13
        },
        {
          name: "식비",
          money: food,
          color: "#EC4899",
          legendFontColor: "#404040",
          legendFontSize: 13
        },
        {
            name: "쇼핑",
            money: shopping,
            color: "red",
            legendFontColor: "#404040",
            legendFontSize: 13
        },
        {
          name: "관광",
          money: sightseeing,
          color: "#F59E0B",
          legendFontColor: "#404040",
          legendFontSize: 13
        },
        {
          name: "기타",
          money: others,
          color: "#D9D9D9",
          legendFontColor: "#404040",
          legendFontSize: 13
        }
      ];

    const fetchData = async () => {
        try {
          //const jwtToken = await AsyncStorage.getItem('jwtToken');
          //console.log(jwtToken);
      
          const response = await axios.get(
            `http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/report/travel/${id}/detail`,
            {
              headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
      
          console.log(response);
      
          if (response.status === 200) {
            const data = response.data;
            //console.log(data); // Log the received data
      
            const a = data.accommodation;
            const f = data.flight;
            const t = data.transportation;
            const food = data.food;
            const s = data.shopping
            const si = data.sightseeing;
            const o = data.others;
            const total = data.total;
            const rest = data.rest;

            setAccomodation(a);
            setFlight(f);
            setTransportation(t);
            setFood(food);
            setShopping(s);
            setSightseeing(si);
            setOthers(o);
            setTotalMoney(total);
            setRestMoney(rest);

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
    

    return(
        <View style = {styles.container}>
            <View style={styles.title}>
                <Text style={{fontWeight: 'bold',}}>{title}</Text>
            </View>
            <View style={styles.bunsuk}>
                <Text style={{fontWeight: 'bold',}}>분석</Text>
                <Ionicons name="remove-outline" size={28} color="#006FFD" />
            </View>
            <View style={styles.pieChart}>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        //propsForLabels:
                    }}
                    accessor={"money"}
                    backgroundColor={"transparent"}
                    paddingLeft={"25"}
                    />
            </View>
            <ScrollView style={styles.lists}>
                {tripList && tripList.map(item => (
                    <View key={item.id} style={{  }}>
                        <List.Item
                        title={props => (
                            <Text style={{fontWeight: 'bold',}}>{item.category}</Text>
                        )}
                        description={props => (
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{item.percentage}</Text>
                                <Text style={styles.text}>%  |  </Text>
                                <Text style={styles.text}>{item.money}</Text>
                                <Text style={styles.text}> 원</Text>
                            </View>
                        )}
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
                          //navigation.navigate('Main', {id: item.id});
                        }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title:{
        flex: 0.1,
        alignItems: 'center',
        paddingVertical: 20,
        //marginTop: '10%',
    }, 
    bunsuk: {
        flex: 0.1,
        alignItems: 'center',
    } ,
    pieChart:{
        flex: 0.7,
        alignItems: 'center',
    },
    lists: {
        flex: 1.5,
    },
    textContainer: {
        flexDirection: 'row',
        paddingVertical: 3,
    },
    text: {
        color: "grey",
        fontSize: 13,
    },
    rightArrow:{
        justifyContent: 'center',
    },
});

export default ReportScreen;