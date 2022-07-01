import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

GoogleSignin.configure({
  webClientId: '313905161226-64ra2eugqpm9td3t1gqcc49s6cmn9s7p.apps.googleusercontent.com'
});
const LoginEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const googleLogin = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      let result = await auth().signInWithCredential(googleCredential)
      return result;
      //     .then((res)=>{
      //     console.log('data...',res)
      //     // this.props.navigation.replace('HomeScreen');
      // });
    } catch (e) {
      
      
      console.log('error.,,', e)
    }
  }
  const EmailLogin = () => {
    if (email.length === 0 || password.length === 0) {
      alert(
        'Please Fill all the requirement.'
      )
    } else {
      
      console.log('else')
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          navigation.navigate('Login')
          console.log('User account created & signed in!', e);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          
          console.error(error);
        });
    }
    
  }
  console.log(email)
  
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fafafa' }}>
      <Image style={{
        height: hp('30%'),
        resizeMode: 'contain',
        width: wp('40%'),
        transform: [{ rotate: '14deg' }],
        alignItems: 'center',
        alignSelf: 'center'
      }} source={require('../../assets/logo.png')}/>
      <TextInput onChangeText={(e) => {
        setEmail(e)
      }} placeholder={'Full Name'}  style={{
        width: '90%',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#8d71fe',
        paddingHorizontal: wp('2%')
      }}/>
      <TextInput onChangeText={(e) => {
        setEmail(e)
      }} placeholder={'Email'} keyboardType={'email-address'} style={{
        width: '90%',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#8d71fe',
        paddingHorizontal: wp('2%')
      }}/>
      <TextInput onChangeText={(e) => {
        setPassword(e)
      }} placeholder={'Password'} secureTextEntry={true} style={{
        width: '90%',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#8d71fe',
        paddingHorizontal: wp('2%')
      }}/>
      <TouchableOpacity onPress={() => {
        EmailLogin()
      }} style={{
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: hp('2%'),
        alignSelf: 'center',
        justifyContent: 'center',
        width: '60%',
        backgroundColor: '#8d71fe'
      }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}
export default LoginEmail;
