import * as React from 'react';
import { 
  StyleSheet, 
   } from 'react-native';
import { CalendarList } from 'react-native-calendars';


function MainCalender() {
  return (
    <CalendarList 
          pagingEnabled 
          horizontal
          style={styles.calendars}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  calendars: {

  },
});

export default MainCalender;