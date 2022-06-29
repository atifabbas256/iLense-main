import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

function HomeScreen({ navigation }) {
  
  const takeImageFromCamera = async () => {
    navigation.navigate('TensrFlowBottomTab')
  }
  
  const onClickOCR = async () => {
    navigation.navigate('OCRBottomTab')
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
