//--Farhan--//
import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';


const ShareModal = ({ dismiss, cloud, storage }) => {
  return (
      <View
        style={{
          // backgroundColor: 'rgba(0,0,0,0.24)',
          zIndex: 1000,
          margin: 0,
          height: '30%',
          width: '100%',
          positionL: 'absolute',
        }}>
        <View
          style={{
            borderRadius: 25,
            flexDirection: 'column',
            justifyContent: 'center',
            // justifyContent: 'center',
            height: 305,
            // position: 'absolute',
            marginHorizontal: 10,
            bottom:  70,
            // paddingHorizontal: helpers.calWp(20),
            // paddingVertical: helpers.calHp(20),
            backgroundColor: 'transparent'
          }}>
          <View>
            <View style={{ alignItems: 'flex-start', borderRadius: 15, backgroundColor: 'white', marginBottom: 10 }}>
              
              <Text
                style={{
                  color: '#000',
                  alignSelf: 'center',
                  // fontFamily: 'SFProDisplay-Bold',
                  
                  //fontFamily: 'SegoeUI',
                  fontSize: 20,
                  marginVertical: 20
                }}>
                Export
              </Text>
              <TouchableOpacity
                onPress={cloud}
                style={{
                  width: '100%',
                  // backgroundColor:'red',
                  borderTopColor: '#ccc',
                  borderWidth: 2,
                  borderColor: 'white',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    color: '#2b2929',
                    textAlign: 'center',
                    // // fontFamily:'',
                    // // fontFamily: 'SFProDisplay-Medium',
                    fontSize: 17
                  }}>
                  Cloud Storage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={storage}
                style={{
                  borderTopColor: '#ccc',
                  borderWidth: 2,
                  width: '100%',
                  borderColor: 'transparent',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  justifyContent: 'center'
                  
                }}>
                <Text
                  style={{
                    color: '#2b2929',
                    textAlign: 'center',
                    // fontFamily: 'Arial-bold',
                    // fontFamily: 'SFProDisplay-Medium',
                    fontSize: 17
                    // marginBottom: helpers.calHp(30),
                  }}>
                  Mobile Storage
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={dismiss}
              style={{
                borderTopColor: '#ccc',
                borderWidth: 1,
                width: '100%',
                borderRadius: 15,
                borderLeftWidth: 0,
                borderColor: 'white',
                backgroundColor: '#fff',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 20,
                justifyContent: 'center'
                
              }}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  // fontFamily: 'Arial-bold',
                  // fontFamily: 'SFProDisplay-Medium',
                  fontSize: 17
                  // marginBottom: helpers.calHp(30),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};
export default ShareModal;
