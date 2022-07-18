import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

function HomeScreen({ route, navigation }) {
  const [imageUri, setImageUriUri] = useState(null);
  const [response, setResponse] = useState('');
  
  useEffect(() => {
    // console.log('route', route.params.data[0].label)
    let word = route && route?.params?.data[0].label
    let token = '7a5d030123d4dd6f297e287d8e1ae7d6236f87d1';
    apiFetch('https://owlbot.info/api/v4/dictionary/' + word, token)
      .then((data) => {
        console.log('response', data)
        setResponse(data)
      }).catch((err) => {
      console.log('err', err)
    })
  },[]);
  
  const apiFetch = (url, token) => {
    let headers = {
      headers: {
        Authorization: 'Token 7a5d030123d4dd6f297e287d8e1ae7d6236f87d1'
      }
    }
    console.log('Request url:', url, headers);
    return fetch(url, headers)
      .then(extractResult).catch(extractError)
  }
  
  const extractResult = async (res) => {
    //console.log("extractResult raw", res);
    if (res.status === 204) {
      return Promise.resolve('');
    }
    if (res.status !== 200) {
      // console.log('Not 200', res);
    }
    const resp = await res.json();
    //console.log('REQUEST RESPONSE', JSON.stringify(resp));
    if (resp && resp.error) {
      console.log('Has error', resp);
      if (resp.error.message === 'Authorization Required') {
        console.log('Authorization Check');
      } else {
        return Promise.reject(resp.error.message);
      }
      // return Promise.reject(resp.error.message);
    }
    return Promise.resolve(resp);
  };
  
  const extractError = (err) => {
    console.log('Error', err);
    return Promise.reject(err);
  };
  let defination = response?.definitions && response?.definitions[0]?.definition;
  let image = response?.definitions && response?.definitions[0]?.image_url;
  let name = response?.word;
  return (
    <View style={{ flex: 1, alignItems:'center'}}>
      <Text style={{width:'100%', fontSize:26, backgroundColor:'#00aeed', fontWeight:'bold', padding: 20, color:'#ffffff', textAlign:'center'}}>{name}</Text>
      <Image source={{ uri: image }} style={{height:200, width: 200, resizeMode:'contain'}}/>
      <Text style={{width:'80%', height:'50%', backgroundColor:'#e5e3e3', padding: 20, color:'#000', marginTop:20, fontSize:18, textAlign:'center'}}>{defination}</Text>
      
    </View>
  )
}

export default HomeScreen;
