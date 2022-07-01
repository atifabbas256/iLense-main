import React from 'react';
import HomeScreen from "../screen/OCR/Home/home";
import OCRScreen from "../screen/OCR/ScanData/ocr";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SavedFiles from "../screen/OCR/SavedFile/saved";

const Tab = createBottomTabNavigator();


function CustomTabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#20c65a'
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
        name="Ocr" component={OCRScreen}/>
      <Tab.Screen
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name="content-save-check-outline"
              size={25}
            />)
        }}
        name="Saved" component={SavedFiles}/>
    </Tab.Navigator>
  )
}
export default CustomTabBar;
