import React, {useEffect} from 'react';
import {View,Text} from 'react-native';

function SplashScreen({navigation}) {
    useEffect(()=>{
        setTimeout(
            ()=>{
                navigation.navigate('Home')
            },1000
        )},[]
    )
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Splash Screen</Text>
        </View>
    );
}
export default SplashScreen;
