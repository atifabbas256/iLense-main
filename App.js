import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/Splach/splash';
import LoginEmail from "./src/screen/LoginEmail/login";
import OCRBottomTab from "./src/components/OCRBottomTab";
import TensrFlowBottomTab from "./src/components/TensrFlowBottomTab";
import WalkThrough from "./src/screen/Intro/Walkthrough";
import SignUp from "./src/screen/SignUp/signUp";
import HomeScreen from "./src/screen/Home/home";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();
const OcrStack = createNativeStackNavigator();


// export const OcrNavigation=()=>{
//   return(
//       <NavigationContainer >
//           <OcrStack.Navigator screenOptions={{
//               headerShown: false,
//           }}  >
//               <OcrStack.Screen name="ocr" component={OcrScreen} />
//               <OcrStack.Screen name={'result'} component={Result}/>
//           </OcrStack.Navigator>
//       </NavigationContainer>
//   )
// }
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="walkThrough" component={WalkThrough}/>
        <Stack.Screen name={'Login'} component={LoginEmail}/>
        <Stack.Screen name={'SignUp'} component={SignUp}/>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen}/>
        <Stack.Screen name={'OCRBottomTab'} component={OCRBottomTab}/>
        <Stack.Screen name={'TensrFlowBottomTab'} component={TensrFlowBottomTab}/>
      
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
