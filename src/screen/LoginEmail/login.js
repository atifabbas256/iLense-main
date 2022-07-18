import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";

GoogleSignin.configure({
  webClientId: '313905161226-64ra2eugqpm9td3t1gqcc49s6cmn9s7p.apps.googleusercontent.com'
});
const LoginEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [borderColor, setBorderColor] = useState('');
  
  
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
  const resetPassword = async () => {
    if (email.length === 0) {
      alert(
        'Please Enter Email.'
      )
    } else {
      try {
        auth().sendPasswordResetEmail(email)
          .then(() => {
            console.log('Password reset email sent!')
          })
          .catch((error) => {
            console.log(error)
          });
      } catch (e) {
        console.log('error.,,', e)
      }
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
        .signInWithEmailAndPassword(email, password)
        .then(async (e) => {
          let user = e
          try {
            await AsyncStorage.setItem(
              'loginUser',
              JSON.stringify(user)
            );
          } catch (error) {
            // Error saving data
            console.log(error)
          }
          navigation.reset({
            routes: [{ name: 'HomeScreen' }]
          });
          
          console.log('User account created & signed in!', e);
        })
        .catch(error => {
          alert(error)
          console.log('error',error.code)
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
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#ffffff' }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        <Image style={{
        height: wp('25%'),
        resizeMode: 'contain',
        width: wp('25%'),
        // transform: [{ rotate: '14deg' }],
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: wp(20),
        marginTop: wp(10)
      }} source={require('../../assets/icon.png')}/>
      <TextInput
        onChangeText={(e) => {
        setEmail(e)
      }}
        placeholderTextColor={'#929191'}
        placeholder={'Email'}
        keyboardType={'email-address'}
        style={{
          color:'#000',
          fontWeight:'bold',
          width: '90%',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#00a7e7',
        paddingHorizontal: wp('2%')
      }}/>
      <TextInput
        onChangeText={(e) => {
          setPassword(e)
        }}
        placeholderTextColor={'#929191'}
        placeholder={'Password'}
        secureTextEntry={true}
        style={{
          color:'#000',
          fontWeight:'bold',
          width: '90%',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#00a7e7',
        paddingHorizontal: wp('2%')
      }}/>
     
      <View style={{ width: '90%', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ textAlign: 'left', color: '#000000', fontSize: 15 }}>No account? </Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('SignUp')
        }}>
          <Text style={{ color: '#00a7e7', fontSize: 16 }}>Create one!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {
        EmailLogin()
      }} style={{
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: wp(10),
        marginVertical: hp('2%'),
        alignSelf: 'center',
        justifyContent: 'center',
        width: '60%',
        backgroundColor: '#00a7e7'
      }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        resetPassword().then(r => {
          alert('Password reset email sent!')
        })
      }}>
        <Text style={{ color: '#e70000', fontSize: 16 }}>Forgotten your password?</Text>
      </TouchableOpacity>
      
      {/*<View style={{ alignItems: 'center', alignSelf: 'center', top: '10%' }}>
        <Text style={{ marginBottom: '2%' }}>______ Or ______</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48, marginTop: 10 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            googleLogin().then(r => {
              // console.log('resppmse', r);
              navigation.navigate('HomeScreen')
            })
          }}
          // disabled={this.state.isSigninInProgress}
        />
      </View>*/}
    </View>
    </TouchableWithoutFeedback>
  )
}
export default LoginEmail;
