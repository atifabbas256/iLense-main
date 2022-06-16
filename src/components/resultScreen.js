import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

import TextRecognition from 'react-native-text-recognition';

// pass the image's path to recognize


const OcrScreen = (text) => {
  const [pickUrl, setUrl] = useState('');
  
  /*const takeImageFromCamera = async () => {
    console.log('image')
    const options = {
      mediaType: 'photo',
      cameraType: 'back'
    }
// You can also use as a promise without 'callback':
    const result = await launchImageLibrary(options);
    console.log(result.assets[0].uri)
    const text = await TextRecognition.recognize(result.assets[0].uri, {
      visionIgnoreThreshold: 0.5
    });
    setUrl(text)
  }
  console.log('picker',pickUrl)*/
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>RN OCR SAMPLE Text</Text>
      <Text>{text}</Text>
      {/*<View>
        <TouchableOpacity
          onPress={takeImageFromCamera}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </View>*/}
    </View>
  );
};

export default OcrScreen;
