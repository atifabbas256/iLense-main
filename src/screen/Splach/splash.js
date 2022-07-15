import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import Easing from "react-native/Libraries/Animated/Easing";

function SplashScreen({ navigation }) {
  /*useEffect(async () => {
    
    }, []
  )*/
  let spinValue = new Animated.Value(0);

// First set up animation
  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  ).start(({ finished }) => {
    fadeIn()
  });
// Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000
    }).start(async ({ finished }) => {
      let loginUser = await AsyncStorage.getItem('loginUser');
      
      console.log('finished', finished)
      
      setTimeout(
        () => {
          navigation.replace(loginUser ? 'HomeScreen' : 'walkThrough')
        }, 1000
      )
    });
  };
  
  return (
    <View style={{
      flex: 1, backgroundColor: '#fafafa',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Animated.Image
        style={{
          transform: [{ rotate: spin },
            {
              scaleX: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            },
            {
              scaleY: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }],
          height: wp('30%'),
          resizeMode: 'contain',
          width: wp('30%'),
          alignItems: 'center',
          alignSelf: 'center'
        }}
        source={require('../../assets/icon.png')}/>
      <Animated.View
        style={[
          {
            // Bind opacity to animated value
            opacity: fadeAnim
          }
        ]}
      >
        <Text style={{
          fontSize: wp(20), color: '#000'
        }}>
          <Text style={{ fontSize: wp(20), color: '#00a7e7' }}>i</Text>
          Lens</Text>
      </Animated.View>
    </View>
  );
}
export default SplashScreen;
