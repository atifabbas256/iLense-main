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
  const [text, setText] = useState('hi how are youbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
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
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/*<View>*/}
      {/*  <TouchableOpacity*/}
      {/*    onPress={takeImageFromCamera}>*/}
      {/*    <Text>Take Photo</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      {/*<Text>{pickUrl && pickUrl.map(text =>(*/}
      {/*   <Text>{text}</Text>*/}
      {/* ))}*/}
      {/*</Text>*/}
      {/* <Text>{pickUrl}</Text>*/}
      
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, padding: hp('2%'), fontWeight: 'bold' }}>Result</Text>
        <View style={{
          height: hp('64%'),
          padding: edit ? 0 : hp('1%'),
          elevation: 5,
          width: wp('90%'),
          borderRadius: 10,
          backgroundColor: '#fff'
        }}>
          {edit ?
            <TextInput onChangeText={(e) => {
              setText(e)
            }} textAlign={'justify'} focusable={true} multiline={true} style={{
              borderRadius: 10,
              textAlignVertical: 'top',
              fontSize: 16,
              textAlign: 'justify',
              height: hp('64%'),
              borderColor: '#8d71fe',
              borderWidth: 1
            }}
                       value={text}
            /> :
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                {text}
              </Text>
            </ScrollView>}
        </View>
        
        <View style={{
          flexDirection: 'row',
          marginTop: hp('2%'),
          width: wp('90%'),
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress={() => {
            setEdit(!edit)
          }}>
            <View>
              <AntDesign name={edit ? 'save' : 'edit'} color={'black'} size={22}/>
              <Text style={{ marginTop: hp('1%') }}>{edit ? 'Done' : 'Edit'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            
            <View>
              <AntDesign name={'delete'} color={'black'} size={26}/>
              <Text style={{ marginTop: hp('1%') }}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            
            <View style={{ alignItems: 'center' }}>
              <AntDesign name={'delete'} color={'black'} size={20}/>
              <Text style={{ marginTop: hp('1%') }}>Delete</Text>
            </View>
          </TouchableOpacity>
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
            backgroundColor: edit ? '#afaeae' : '#8d71fe',
            paddingVertical: hp('2%')
          }}>
            <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
              Export
            </Text>
          </View>
        </TouchableOpacity>
      
      </View>
      {/*<ResultScreen text={pickUrl}/>*/}
    </View>
  );
};

export default OcrScreen;
