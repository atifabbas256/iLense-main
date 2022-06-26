import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/Splach/splash';
import LoginEmail from "./src/screen/LoginEmail/login";
import CustomBottomTab from "./src/components/CustomBottomTab";
import WalkThrough from "./src/screen/Intro/Walkthrough";
const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}  >
            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="walkThrough" component={WalkThrough} />

            <Stack.Screen name={'Login'} component={LoginEmail}/>


            <Stack.Screen name={'HomeStack'} component={CustomBottomTab}/>


        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
