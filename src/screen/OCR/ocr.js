import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import ResultScreen from "../../components/resultScreen";


import TextRecognition from 'react-native-text-recognition';

// pass the image's path to recognize


const OcrScreen = () => {
  const [pickUrl, setUrl] = useState('');

  const takeImageFromCamera = async () => {
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
    }).then((r)=>{
      setUrl(r)
      console.log('rrrr',r)});
    //
    console.log('picker',text)
  }

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>RN OCR SAMPLE</Text>
      <View>
        <TouchableOpacity
          onPress={takeImageFromCamera}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </View>
     <Text>{pickUrl && pickUrl.map(text =>(
        <Text>{text}</Text>
      ))}
     </Text>
      <Text>{pickUrl}</Text>

      {/*<ResultScreen text={pickUrl}/>*/}
    </View>
  );
};

export default OcrScreen;
