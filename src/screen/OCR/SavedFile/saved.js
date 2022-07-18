import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ToastAndroid, Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-community/async-storage";
import RNFS from "react-native-fs";
import moment from "moment";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";

const SavedFiles = () => {
  
  const [notes, setNotes] = useState([]);
  
  useEffect(async () => {
    await GetNotes()
    
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
  const GetNotes = () => {
    let uid;
    storeData().then(async user => {
      let userData = await JSON.parse(user)
      // console.log('loginUser',)
      uid = userData.user.uid;
      
      console.log('url', uid)
      await firestore()
        .collection('Notes')
        // Filter results
        .where('uid', '==', uid)
        .get()
        .then(querySnapshot => {
          
          setNotes(querySnapshot._docs)
          /* ... */
        });
    });
  }
  
  const onDownloadImagePress = (item) => {
    let url = item._data?.url
    let RNFS = require('react-native-fs');
    RNFS.downloadFile({
      fromUrl: url,
      toFile: `${RNFS.ExternalStorageDirectoryPath}/${moment()}.doc`
    }).promise.then((r) => {
      console.log('download', r)
      ToastAndroid.show('File Downloaded', ToastAndroid.SHORT)
  
    }).catch((error) => {
      console.log('downloadError', error)
    });
  }
  
  return (
    <View style={{
      flex: 1,
      alignItems:'center'
    }}>
      <Text style={{
        width:'100%',
        padding:10,
        color:'#000',
        fontWeight:'bold',
        fontSize: 24, textAlign: 'center', justifyContent: 'center'
      }}>
        Saved Files
      </Text>
      <FlatList data={notes}
                numColumns={2}
                style={{flex:1,}} contentContainerStyle={{justifyContent:'space-between'}} renderItem={(item) => {
        console.log(item)
        return (
          <TouchableOpacity
            onPress={() => onDownloadImagePress(item.item)}
            style={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 10,
              margin: hp('1%'),
              backgroundColor: '#00aeed',
            }}>
            <View style={{position:'absolute', top:10, right:10}}>
              <AntDesign name={'download'} color={'white'} size={20}/>
            </View>
            <Image source={require('../../../assets/file.png')}
            style={{height:200, width:200, resizeMode:'contain'}}/>
              <Text numberOfLines={1}
                style={{ width:150,fontSize: 20, paddingHorizontal:10, textAlign: 'center', color: '#fff', justifyContent: 'center' }}>
              {item.item?._data?.name}
            </Text>
            </TouchableOpacity>
      )
      }}/>
    </View>
  );
}
export default SavedFiles;
