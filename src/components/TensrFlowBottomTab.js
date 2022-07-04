import React from 'react';
import HomeScreen from "../screen/TensorFlow/Home/home";
import Result from "../screen/TensorFlow/Result/result";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


function CustomTabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8d71fe'
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              color={color}
              name="scan1"
              size={25}/>)
        }}
        name="Home" component={HomeScreen}/>
      <Tab.Screen
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <IonicIcon
              color={color}
              name="reader-outline"
              size={25}
            />)
        }}
        name="Result" component={Result}/>
    </Tab.Navigator>
  )
}
export default CustomTabBar;
