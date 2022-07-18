import React, { useEffect, useState } from 'react';
import {
  ToastAndroid,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import moment from "moment";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextRecognition from 'react-native-text-recognition';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-community/async-storage";
import ShareModal from "../../../components/ExportModel";
// const reference = storage().ref('Database1');
// pass the image's path to recognize

const OcrScreen = () => {
  const [pickUrl, setUrl] = useState('');
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(false);
  const [path, setPath] = useState('');
  const [shareModel, SetShareModal] = useState(false);
  const [uid, setUid] = useState('');
  
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        requestCameraPermission
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  
  
  useEffect(() => {
    mkDir()
    requestCameraPermission()
    storeData().then(async user => {
      let userData = await JSON.parse(user)
      setUid(uid);
      console.log('loginUser', userData.user.uid)
      
    });
  }, [])
  const storeData = async () => {
    try {
      let loginUser = await AsyncStorage.getItem('loginUser');
      return (loginUser);
      
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  };
  
  const mkDir = async (type) => {
    let RNFS = require('react-native-fs');
    const    AppFolder    =     'iLens';
    const DirectoryPath= RNFS.ExternalStorageDirectoryPath +'/'+ AppFolder;
    await RNFS.mkdir(DirectoryPath);
  }
  
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
    
    let path = `${RNFS.ExternalStorageDirectoryPath}/iLens/${moment()}.doc`;
    console.log('path', path)
    setPath(path);
    RNFS.writeFile(path, text, 'utf8')
      .then(async (success) => {
        console.log('FILE WRITTEN!', await success);
        // await reference.putFile(path);
        const reference = storage().ref('/UploadFile/' + moment());
        await reference.putFile(path);
        const url = await reference.getDownloadURL();
        // const url = await storage().ref('images/profile-1.png').getDownloadURL();
        
        // await createNotes(url);
        SetShareModal(false)
        Alert.alert(
          "Saved",
          "File Saved Successfully in Your Device",
          [
            { text: "OK", onPress: () => setText('') }
          ]
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
    //     const pathToFile = path;
  }
  
  const saveFileFireBase = () => {
    let RNFS = require('react-native-fs');
    
    let path = `${RNFS.TemporaryDirectoryPath}/${moment()}.doc`;
    console.log('path', path)
    setPath(path);
    RNFS.writeFile(path, text, 'utf8')
      .then(async (success) => {
        console.log('FILE WRITTEN!', await success);
        // await reference.putFile(path);
        const reference = storage().ref('/UploadFile/' + moment());
        await reference.putFile(path);
        const url = await reference.getDownloadURL();
        await createNotes(url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  
  const createNotes = (url) => {
    let uid;
    storeData().then(async user => {
      let userData = await JSON.parse(user)
      // console.log('loginUser',)
      uid = userData.user.uid;
      
      console.log('url', uid)
      firestore()
        .collection('Notes')
        .add({
          uid: uid,
          name: 'file-' + moment(),
          url: url
        })
        .then((r) => {
          console.log('User added!');
          SetShareModal(false)
          Alert.alert(
            "Saved",
            "File Saved Successfully DataBase",
            [
              { text: "OK", onPress: () => setText('') }
            ]
          );
        }).catch(e => {
        console.log('errrr', e)
      });
    });
  }
  
  console.log('text', text, moment)
  return (
    <View style={{ flex: 1 }}>
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
                  : SetShareModal(true)
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
      {shareModel && <View style={{
        backgroundColor: 'rgba(0,0,0,0.22)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        justifyContent: "flex-end"
      }}>
        <ShareModal
          dismiss={() => SetShareModal(false)}
          cloud={() => saveFileFireBase()}
          storage={() => saveFile()}/>
      </View>}
    </View>
  );
};

export default OcrScreen;
