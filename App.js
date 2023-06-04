import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieScreen from "./src/screens/MovieScreen";
import HomeScreen from "./src/screens/HomeScreen";
import {useFonts} from 'expo-font';
import {Text, View} from 'react-native';


const Stack = createStackNavigator()

export default () => {
  const [fontLoaded] = useFonts({
    'Regular': require("./assets/fonts/NunitoSans-Regular.ttf"),
    'Bold': require("./assets/fonts/NunitoSans-Bold.ttf"),
    'Black': require("./assets/fonts/NunitoSans-Black.ttf"),
    'ExtraBold': require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    'ExtraLight': require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    'Light': require("./assets/fonts/NunitoSans-Light.ttf"),
    'SemiBold': require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });

  if (!fontLoaded){ //to avoid error if font is not yet loaded
    return (
      <View style={{flex:1, justifyContent: "center",alignItems: "center",}}>
        <Text>Loading.....</Text>
      </View>
    ); 
  } 
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} 
           options={{headerShown: false}}
        />
        <Stack.Screen name="movie" component={MovieScreen} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}