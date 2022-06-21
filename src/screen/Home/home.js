import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Tflite from 'tflite-react-native';


let tflite = new Tflite();
import header from 'react-native/Libraries/NewAppScreen/components/Header';
const model = require('../../main/assets/model_unquant.tflite');
const labelFile = require('../../main/assets/lablesTranslation.xlsx');
tflite.loadModel({
    model: 'models/model_unquant.tflite',// required
    labels: 'models/lablesTranslation.xlsx',  // required
    numThreads: 1,                              // defaults to 1
  },
  (err, res) => {
    if(err)
      console.log(err);
    else
      console.log(res);
  });
function HomeScreen({navigation}) {
    const [pickUrl,setUrl]=useState(null);
  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  
  
  });
  
const takeImageFromCamera=async ()=>{
   const options={
       mediaType:'photo',
       cameraType:'back'
   }
// You can also use as a promise without 'callback':
    const result = await launchCamera(options);
   console.log(result)
  tflite.runModelOnImage({
      path: result[0].path,  // required
      imageMean: 128.0, // defaults to 127.5
      imageStd: 128.0,  // defaults to 127.5
      numResults: 3,    // defaults to 5
      threshold: 0.05   // defaults to 0.1
    },
    (err, res) => {
      if(err)
        console.log(err);
      else
        console.log(res);
    });
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
