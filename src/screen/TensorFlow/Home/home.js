import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tflite from 'tflite-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

let tflite = new Tflite();

tflite.loadModel({
    model: 'models/model.tflite',// required
    labels: 'models/labels.txt',  // required
  },
  (err, res) => {
    if (err)
      console.log(err);
    else
      console.log('response./././.', res);
  });
function HomeScreen({ navigation }) {
  const [imageUri, setImageUriUri] = useState(null);
  const [response, setResponse] = useState('');
  
  useEffect( () => {
    takeImageFromCamera()
  },[])
  
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
    setImageUriUri(result.assets[0].uri)
    console.log('imageUri', result.assets[0].uri)
    try {
    tflite.runModelOnImage({
        path: result.assets[0].uri,  // required
        // imageMean: 128.0, // defaults to 127.5
        // imageStd: 128.0,  // defaults to 127.5
        // numResults: 3,    // defaults to 5
        // threshold: 1   // defaults to 0.1
      },
      (err, res) => {
        setResponse(res)
        if (err)
          console.log(err);
        else
          console.log('response', res);
        // navigation.navigate('Result', { uri: result.assets[0].uri, res: res })
      });}
    catch (e) {
      console.log('response', e);
    }
  }
  
  
  return (
    <View style={{ flex: 1 }}>
      {response ? <View style={{ flex: 1 }}>
          <Image
            style={{
              height: '80%',
              width: '100%'
            }}
            source={{ uri: imageUri }}/>
          {response.map(item => (
            
            <View style={{ flex: 1, flexDirection:'row', justifyContent:'space-around', alignItems:'center',
              marginBottom: hp('0.2%'),
              backgroundColor: '#8d71fe', }}>
              <Text style={{fontSize: 20, color: '#fff',}}>{item.label}</Text>
              <Text style={{fontSize: 20, color: '#fff',}}>{(item.confidence * 100).toFixed(2)}%</Text>
            </View>))}
        <TouchableOpacity
          onPress={() => navigation.navigate('Result',{
            data: response,
          })}
          style={{
          padding: 20,
          // borderRadius: 10,
          marginTop: hp('0.5%'),
          width: wp('100%'),
          backgroundColor: '#8d71fe',
          paddingVertical: hp('2%')}}>
          <Text style={{fontSize: 20, color: '#ffffff', fontWeight:'bold'}}>More Details</Text>
        </TouchableOpacity>
        </View>
        :
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
      }
    </View>
  )
}

export default HomeScreen;
