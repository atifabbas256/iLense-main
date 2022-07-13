import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import auth from '@react-native-firebase/auth';
import TextRecognition from 'react-native-text-recognition';


function HomeScreen({ route,navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [response, setResponse] = useState('');

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
    setImageUri(result.assets[0].uri)
  console.log(result.assets[0].uri)
  const text = await TextRecognition.recognize(result.assets[0].uri, {
    visionIgnoreThreshold: 0.5
  }).then((r) => {
    // setUrl(r)
    console.log('rrrr', r)
  });
  //
  console.log('picker', text)   }

//   const takeImageFromCamera = async () => {
//     console.log('image')
//     const options = {
//       mediaType: 'photo',
//       cameraType: 'back'
//     }
// // You can also use as a promise without 'callback':
//     const result = await launchImageLibrary(options);
//     console.log(result.assets[0].uri)
//     const text = await TextRecognition.recognize(result.assets[0].uri, {
//       visionIgnoreThreshold: 0.5
//     }).then((r) => {
//       // setUrl(r)
//       console.log('rrrr', r)
//     });
//     //
//     console.log('picker', text)
//   }

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  )
}

export default HomeScreen;
