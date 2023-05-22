import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainView from '../components/MainView';

const stack = createStackNavigator();

function MainScreen() {
  return(
    <MainView />
  )
};

export default MainScreen;