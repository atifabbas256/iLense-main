import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/Splach/splash';
import LoginEmail from "./src/screen/LoginEmail/login";
import OCRBottomTab from "./src/components/OCRBottomTab";
import TensrFlowBottomTab from "./src/components/TensrFlowBottomTab";
import WalkThrough from "./src/screen/Intro/Walkthrough";
import OcrScreen from "./src/screen/OCR/ScanData/ocr";
import HomeScreen from "./src/screen/Home/home";
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
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}  >
            <Stack.Screen name={'HomeScreen'} component={HomeScreen}/>
            <Stack.Screen name={'OCRBottomTab'} component={OCRBottomTab}/>
            <Stack.Screen name={'TensrFlowBottomTab'} component={TensrFlowBottomTab}/>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="walkThrough" component={WalkThrough} />
            <Stack.Screen name={'Login'} component={LoginEmail}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
