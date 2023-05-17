import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
   } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';

function MainView() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.lists}>
        <CalendarList 
          pagingEnabled 
          horizontal
          style={styles.calendars}
        />
      </ScrollView>
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