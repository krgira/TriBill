import React, {useState} from "react";
import { 
  View,
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Text
  } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

import MainCalender from '../components/MainCalender';
import FloatingWriteButton from '../components/FloatingWriteButton';

const stack = createStackNavigator();

function MainScreen({navigation}) {
  const pplname = ["규리뽀", "최호빵", "승재"];
  const [selectedMember, setSelectedMember] = useState(pplname[0]);
  

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