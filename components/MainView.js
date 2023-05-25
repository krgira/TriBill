import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Button,
   } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import FloatingWriteButton from './FloatingWriteButton';

function MainView({navigation}) {


  return (
    <View style={styles.container}>
      <ScrollView style={styles.lists}>
        <CalendarList 
          pagingEnabled 
          horizontal
          style={styles.calendars}
        />
      </ScrollView>
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginTop: 60,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerIcon: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 15,
    color: "#4974A5",
    paddingHorizontal: 20,
  },
  profiles: {
    marginTop: 20,
    marginLeft: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendars: {

  },
  lists: {
    // alignItems: "center",
  },
});

export default MainView;