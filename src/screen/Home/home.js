import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import auth from "@react-native-firebase/auth";

function HomeScreen({ route, navigation }) {
  
  useEffect(() => {
    storeData().then(r => console.log('user data save'))
    },
  )
  
  const storeData = async () => {
    try {
      let loginUser = await AsyncStorage.getItem('loginUser');
  console.log('loginUser',loginUser)
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  };
  
  const takeImageFromCamera = async () => {
    navigation.navigate('TensrFlowBottomTab')
  }
  
  const onClickOCR = async () => {
    navigation.navigate('OCRBottomTab')
  }
  
  const logOut = () => {
    auth()
      .signOut()
      .then(() => navigation.reset({
        routes: [{ name: 'Login' }]
      }))
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={logOut} style={{ position: 'absolute', top: 20, right: 10 }}>
        <Text
          style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#ff0000', justifyContent: 'center' }}>
          Sign Out
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={takeImageFromCamera} style={{
          marginVertical: 20,
          padding: 20,
          borderRadius: 10,
          marginTop: hp('2%'),
          width: wp('90%'),
          backgroundColor: '#8d71fe',
          paddingVertical: hp('2%')
        }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
            Image Recognize
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickOCR} style={{
          marginVertical: 20,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: hp('2%'),
          width: wp('90%'),
          backgroundColor: '#8d71fe',
          paddingVertical: hp('2%')
        }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
            OCR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default HomeScreen;
