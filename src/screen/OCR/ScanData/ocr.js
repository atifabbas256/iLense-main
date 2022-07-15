import React, { useState } from 'react';
import { ToastAndroid, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextRecognition from 'react-native-text-recognition';

const reference = storage().ref('Database1');
// pass the image's path to recognize


const OcrScreen = () => {
  const [pickUrl, setUrl] = useState('');
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(false);
  
  /*
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
      }).then((r) => {
        setUrl(r)
        console.log('rrrr', r)
      });
      //
      console.log('picker', text)
    }
  */
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
    setUrl(result.assets[0].uri)
    console.log(result.assets[0].uri)
    const text = await TextRecognition.recognize(result.assets[0].uri, {
      visionIgnoreThreshold: 0.5
    }).then((r) => {
      
      let text = r.join("\n")
      // setUrl(r)
      setText(text)
      console.log('rrrr', r)
    });
    //
    console.log('picker', text)
  }
  
  const saveFile = () => {
    let RNFS = require('react-native-fs');
    
    let path = `${RNFS.ExternalStorageDirectoryPath}/Pictures/Skype/H15.doc`;
    console.log('path', path)
    
    RNFS.writeFile(path, 'hi how are uou assssssssssssssssss', 'utf8')
      .then(async (success) => {
        console.log('FILE WRITTEN!', success);
        await reference.putFile(path);
        
        console.log('FILE WRITTEN!', success);
      })
      .catch((err) => {
        console.log(err.message);
      });
    //     const pathToFile = path;
    
    
    //
    // RNFS.writeFile(path, text, 'utf8')
    //     .then(async (success) => {
    //
    //           //   const pathToFile = path;
    //           // let wait=  await reference.putFile(pathToFile);
    //
    //         console.log('FILE WRITTEN!',success);
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     });
    
  }
  
  console.log('text', text)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      {text ?
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, padding: hp('2%'), color: '#000', fontWeight: 'bold' }}>Result</Text>
          <View style={{
            height: hp('64%'),
            padding: edit ? 0 : hp('1%'),
            elevation: 5,
            width: wp('90%'),
            borderRadius: 10,
            backgroundColor: '#fff'
          }}>
            {edit ?
              <TextInput
                onChangeText={(e) => {
                  setText(e)
                }}
                value={text}
                textAlign={'justify'}
                focusable={true}
                multiline={true}
                style={{
                  borderRadius: 10,
                  textAlignVertical: 'top',
                  fontSize: 16,
                  padding: 10,
                  textAlign: 'justify',
                  height: hp('64%'),
                  borderColor: '#00aeed',
                  borderWidth: 1,
                  color: '#000'
                }}
              
              /> :
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 16, textAlign: 'justify', color: '#000' }}>
                  {text}
                </Text>
              </ScrollView>}
          </View>
          
          <View style={{
            flexDirection: 'row',
            marginTop: hp('2%'),
            width: wp('90%'),
            justifyContent: 'space-evenly'
          }}>
            <TouchableOpacity
              onPress={() => {
                setEdit(!edit)
              }}
              style={{
                flexDirection: 'row',
                padding: hp('1%'),
                width: wp('40%'),
                justifyContent: 'center',
                backgroundColor: '#00aeed',
                alignItems: 'center',
                borderRadius: 10
              }}>
              <View>
                <AntDesign name={edit ? 'save' : 'edit'} color={'white'} size={30}/>
                {/*<Text style={{ color:'white' }}>{edit ? 'Done' : 'Edit'}</Text>*/}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                setText('')
              }}
              style={{
                borderRadius: 10,
                flexDirection: 'row',
                padding: hp('1%'),
                width: wp('40%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00aeed'
              }}>
              <View>
                <AntDesign name={'delete'} color={'white'} size={30}/>
                {/*<Text style={{ color:'white' }}>Delete</Text>*/}
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              
              <View style={{ alignItems: 'center' }}>
                <AntDesign name={'delete'} color={'black'} size={20}/>
                <Text style={{ marginTop: hp('1%') }}>Delete</Text>
              </View>
            </TouchableOpacity>*/}
          </View>
          <TouchableOpacity
            // disabled={edit}
            onPress={() => {
              edit ?
                ToastAndroid.show('You are in editing mode', ToastAndroid.SHORT)
                : saveFile()
            }}>
            <View style={{
              borderRadius: 10,
              marginTop: hp('2%'),
              width: wp('90%'),
              backgroundColor: edit ? '#afaeae' : '#00aeed',
              paddingVertical: hp('2%')
            }}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
                Export
              </Text>
            </View>
          </TouchableOpacity>
        
        </View> :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <TouchableOpacity onPress={() => takeImageFromCamera('Camera')} style={{
              marginVertical: 20,
              padding: 20,
              borderRadius: 10,
              marginTop: hp('2%'),
              width: wp('90%'),
              backgroundColor: '#00aeed',
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
              backgroundColor: '#00aeed',
              paddingVertical: hp('2%')
            }}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
                Library
              </Text>
            </TouchableOpacity>
          </View>
        </View>}
    </View>
  );
};

export default OcrScreen;
