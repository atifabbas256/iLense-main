import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tflite from 'tflite-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

let tflite = new Tflite();

tflite.loadModel({
    model: 'models/model.tflite',// required
    labels: 'models/labels_mobilenet_quant_v1_224.txt',  // required
    numThreads: 1                              // defaults to 1
  },
  (err, res) => {
    if (err)
      console.log(err);
    else
      console.log('response./././.', res);
  });
function HomeScreen({ navigation }) {
  const [pickUrl, setUrl] = useState(null);
  
  const takeImageFromCamera = async (type) => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back'
    }
    // You can also use as a promise without 'callback':
    let result
    if (type === 'Camera') {
      result = await launchCamera(options);
    } else {
      result = await launchImageLibrary(options);
    }
    console.log('result', result)
    tflite.runModelOnImage({
        path: result.assets[0].uri,  // required
        imageMean: 128.0, // defaults to 127.5
        imageStd: 128.0,  // defaults to 127.5
        numResults: 3,    // defaults to 5
        threshold: 0.05   // defaults to 0.1
      },
      (err, res) => {
        if (err)
          console.log(err);
        else
          console.log('response', res);
      });
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <TouchableOpacity onPress={() => takeImageFromCamera('Camera')} style={{
          marginVertical: 20,
          padding: 20,
          borderRadius: 10,
          marginTop: hp('2%'),
          width: wp('90%'),
          backgroundColor: '#8d71fe',
          paddingVertical: hp('2%')
        }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takeImageFromCamera('Library')} style={{
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
            Library
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default HomeScreen;
