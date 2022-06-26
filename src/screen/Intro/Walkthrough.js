import React from 'react';
import {View, Text, Image} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Ionicons';

const slides = [
    {
        key: 1,
        title: 'OCR',
        text: 'Instant conversion of text with OCR,\n don\'t for of typing',
        image: require('../../assets/ocr.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Scan',
        text: 'Turn any document/Image into PDF.',
        image: require('../../assets/scan.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../../assets/ocr.png'),
        backgroundColor: '#22bcb5',
    }
];
const WalkThrough=({navigation})=>{
  const  renderNextButton = () => {
        return (
            <View style={{borderRadius:10,backgroundColor:'#8d71fe',paddingVertical:hp('2%')}}>
               <Text style={{fontSize:20,textAlign:'center',color:'#fff',justifyContent:'center'}}>
                   Next
               </Text>
            </View>
        );
    };
  const renderDone=()=>{
      return (
          <View style={{borderRadius:10,backgroundColor:'#8d71fe',paddingVertical:hp('2%')}}>
              <Text style={{fontSize:20,textAlign:'center',color:'#fff',justifyContent:'center'}}>
                  Done
              </Text>
          </View>
      );
  }
  const  renderSkipButton = () => {
        return (
            <View style={{backgroundColor:'#fff',borderRadius:10,}}>
                <Text style={{fontSize:20,textAlign:'center',justifyContent:'center',paddingVertical:hp('2%')}}>
                    Skip
                </Text>
            </View>
        );
    };
   const _renderItem = ({ item }) => {
        return (
            <View style={{flex:1,backgroundColor:'#fafafa',}}>

                <Image style={{height:hp('60%'),resizeMode:'contain',width:wp('70%'),alignItems:'center',alignSelf:'center'}} source={item.image} />
                <Text style={{fontSize:23,fontWeight:'800',color:'#000',paddingVertical:hp('2%'),textAlign:'center'}}>{item.title}</Text>
                <Text style={{textAlign:'center',fontSize:15,color:'#000'}}>{item.text}</Text>
            </View>
        );
    }
    return(
        <AppIntroSlider
            data={slides}
            dotClickEnabled={false}
dotStyle={{backgroundColor: 'transparent'}}
            renderItem={_renderItem}
            bottomButton={true}
            renderSkipButton={renderSkipButton}
            renderNextButton={renderNextButton}
            renderDoneButton={
            renderDone
            }
            onDone={()=>{navigation.replace('Login')}}
            showNextButton={true}
            showDoneButton={true}
            showSkipButton={true}
        />
    )

}
export default WalkThrough;
