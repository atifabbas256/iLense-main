import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";

function SplashScreen({ navigation }) {
  useEffect(async () => {
      let loginUser = await AsyncStorage.getItem('loginUser');
    
      setTimeout(
        () => {
          navigation.navigate(loginUser ? 'HomeScreen' : 'walkThrough')
        }, 1000
      )
    }, []
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{
        height: hp('60%'),
        resizeMode: 'contain',
        width: wp('70%'),
        transform: [{ rotate: '14deg' }],
        alignItems: 'center',
        alignSelf: 'center'
      }} source={require('../../assets/logo.png')}/>
      
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>iLens</Text>
    </View>
  );
}
export default SplashScreen;
