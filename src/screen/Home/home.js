import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import auth from "@react-native-firebase/auth";

function HomeScreen({ route, navigation }) {
  
  useEffect(() => {
      storeData().then(r => console.log('user data save'))
    }
  )
  
  const storeData = async () => {
    try {
      let loginUser = await AsyncStorage.getItem('loginUser');
      console.log('loginUser', loginUser)
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
  
  const logOut = async () => {
    await AsyncStorage.setItem('loginUser', '');
    auth()
      .signOut()
      .then(() => navigation.reset({
        routes: [{ name: 'Login' }]
      }))
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        width: wp('90%'),
        justifyContent: 'center',
        height: hp(7),
        alignItems: 'flex-end'
      }}><TouchableOpacity onPress={logOut} style={{}}>
        <Text
          style={{
            fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#ff0000',
            justifyContent: 'center'
          }}>
          Sign Out
        </Text>
      </TouchableOpacity></View>
      <ScrollView
        style={{}}
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={takeImageFromCamera} style={{
          marginVertical: 20,
          // padding: 20,
          borderRadius: wp(5),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('2%'),
          width: wp('90%'),
          height: wp('50%'),
          backgroundColor: '#8d71fe',
          // paddingVertical: hp('2%')
          overflow: 'hidden'
        }}>
          <ImageBackground
            source={require('../../assets/pattern-recognition.png')}
            resizeMode="cover"
            style={{
              height: '100%', width: '100%',
              borderRadius: wp(5),
  
            }}>
            <View style={{
              flex: 1, padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(137,105,247,0.73)',
              borderRadius: wp(5),
  
            }}>
              <Text style={{
                fontSize: 20, fontWeight: 'bold',
                color: '#fff', justifyContent: 'center'
              }}>
                Image Recognize
              </Text>
              <Text
                multiline={true}
                numberOfLines={5}
                style={{ fontSize: 16, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
                Image recognition, a subcategory of Computer Vision and Artificial Intelligence, represents a set of
                methods for detecting and analyzing images to enable the automation of a specific task.</Text>
              <Image
                source={require('../../assets/arrow.png')}
                style={{
                  height: wp(6), width: wp(10),
                  resizeMode: 'contain', marginTop: 10,
                  alignSelf: 'flex-end', tintColor: '#ffffff'
                }}/>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickOCR} style={{
          marginVertical: 20,
          // padding: 20,
          borderRadius: wp(5),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('2%'),
          width: wp('90%'),
          height: wp('50%'),
          backgroundColor: '#0f082a'
          // paddingVertical: hp('2%')
        }}>
          <ImageBackground
            source={require('../../assets/OCR-bg.png')}
            resizeMode="cover"
            style={{
              height: '100%', width: '100%',
              borderRadius: wp(5),
  
            }}>
            <View style={{
              flex: 1, padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(122,88,241,0.73)',
              borderRadius: wp(5),
  
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', justifyContent: 'center' }}>OCR </Text>
              <Text
                style={{ fontSize: 16, textAlign: 'center', color: '#fff', justifyContent: 'center' }}
                multiline={true}
                numberOfLines={5}>
                Optical character recognition or optical character reader is the electronic or mechanical conversion of
                images of typed, handwritten or printed text into machine-encoded text, whether from a scanned document,
                a photo of a document, a scene-photo or from subtitle text superimposed on an image
              </Text>
              <Image
                source={require('../../assets/arrow.png')}
                style={{
                  height: wp(6), width: wp(10),
                  resizeMode: 'contain', marginTop: 10,
                  alignSelf: 'flex-end', tintColor: '#ffffff'
                }}/>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={true}
          onPress={onClickOCR} style={{
          padding: 20,
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: wp(5),
          marginTop: hp('2%'),
          width: wp('90%'),
          height: wp('50%'),
          backgroundColor: '#8d71fe',
          paddingVertical: hp('2%')
        }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
            OCR
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
