import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/home';
import SplashScreen from './src/screen/splash';
const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}  >
            <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
