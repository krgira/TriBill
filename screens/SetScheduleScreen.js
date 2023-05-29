import React, {useState} from 'react';
import { CalendarList } from 'react-native-calendars';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { eachDayOfInterval, format } from 'date-fns';

const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};


function CalendarView() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  console.log('start: ', selectedStartDate);
  console.log('End: ', selectedEndDate);

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

const setSchedule = () => {
  fetch('http://172.30.1.16:8080/test/calendar', {
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
      console.log("start date:", data.startDate);
      console.log("end date:", data.endDate);
    })
    .catch(error => {
      console.error(error);
    });
  console.log("fetch end");
};
  return (
    <View style={{flex:1}}>
      <View style={{flex:5}}>
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
      <TouchableOpacity style={{flex:0.5,}} onPress={setSchedule}>
        <Text>등록하기</Text>
      </TouchableOpacity>
    </View>
    
    
  )
  
  
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

export default CalendarView;