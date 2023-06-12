import React, {useState, useEffect} from 'react';
import { CalendarList } from 'react-native-calendars';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { eachDayOfInterval, format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};


function SetScheduleScreen() {
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [tripId, setTripId] = useState();

  //console.log('start: ', selectedStartDate);
  //console.log('End: ', selectedEndDate);
  useEffect(()=>{
    const getTripData = async()=>{
        try{
          // AsyncStorage에서 inputData에 저장된 값 가져오기
            const tripId = await AsyncStorage.getItem("tripId")
            setTripId(tripId);
            // value에 값이 있으면 콘솔에 찍어줘
            if(value!== null){
                console.log(tripId)
            }
        }catch(error){
            console.log(error)
        }
    };
    // 함수 실행
    getTripData();
  },[])
  // Function to handle date selection
  const handleDayPress = (day) => {
    if (selectedStartDate === null) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else if (selectedEndDate === null) {
      if (isSameDay(day.dateString, selectedStartDate)) {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      } else if (day.dateString > selectedStartDate) {
        setSelectedEndDate(day.dateString);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(day.dateString);
      }
    } else {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    }
  };

  const renderFilledDates = () => {
    const markedDates = {};

    if (selectedStartDate && selectedEndDate) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
      const days = eachDayOfInterval({ start: startDate, end: endDate });

      days.forEach((day, index) => {
        const dateString = format(day, 'yyyy-MM-dd');

        if (index === 0) {
          markedDates[dateString] = { selected: true };
        } else if (index === days.length - 1) {
          markedDates[dateString] = { selected: true };
        } else {
          markedDates[dateString] = { selected: true };
        }
      });
    }

    return markedDates;
  };


  const setSchedule = (tripId) => {
    fetch(`http://ec2-54-180-86-234.ap-northeast-2.compute.amazonaws.com:8001/api/trip/${tripId}/create/date`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //console.log("start date:", data.startDate);
        //console.log("end date:", data.endDate);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("SetSchedule fetch end");
  };

  const onPress = () => {
    setSchedule(tripId);
    navigation.navigate("TargetAmount");
  };

  return (
    <View style={{flex:1}}>
      <View style={{flex:20}}>
        <CalendarList
          style={styles.calendar}
          onDayPress={handleDayPress}
          // markingType={'period'}
          markedDates={{
            ...renderFilledDates(),
            [selectedStartDate]: { selected: true },
            [selectedEndDate]: { selected: true },
          }}
        />
      </View>
      <TouchableOpacity 
            style={styles.button}
            onPress={onPress}>
                <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
    </View>
    
    
  )
  
  
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  button: {
    flex: 1,
    backgroundColor: "#4974A5",
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 10,
  },
  buttonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 17,
  }
});

export default SetScheduleScreen;