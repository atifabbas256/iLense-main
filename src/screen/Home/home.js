import React, {useState} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import header from 'react-native/Libraries/NewAppScreen/components/Header';

function HomeScreen({navigation}) {
    const [pickUrl,setUrl]=useState(null);

const takeImageFromCamera=async ()=>{
   const options={
       mediaType:'photo',
       cameraType:'back'
   }
// You can also use as a promise without 'callback':
    const result = await launchCamera(options);
   console.log(result)
}
const onClickOCR=async ()=>{
   navigation.navigate('Ocr')
}
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <View>
               <TouchableOpacity onPress={takeImageFromCamera} style={{
                   marginVertical:20,
                   backgroundColor:'orange',padding:20
               }}>
                   <Text>
                       From Camera
                   </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={onClickOCR} style={{
                   marginVertical:20,
                   backgroundColor:'orange',padding:20,
                 justifyContent:'center',
                 alignItems:'center'
               }}>
                   <Text>
                       OCR
                   </Text>
               </TouchableOpacity>
           </View>
        </View>
    );
}
export default HomeScreen;
