import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import AuthProvider from '../contexts/AuthProvider'
import { Ionicons } from '@expo/vector-icons';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [ fontsLoaded, error ] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });


  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;


  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }}/>
        <Stack.Screen name='pollDetails' options={{ headerShown: false }}/>
        <Stack.Screen name='UserPosts' options={{ headerShown: false }}/>
        <Stack.Screen name='Contacts' options={({ route }) => ({
          title: route.params.name,
        })}/>
        <Stack.Screen name='CreatePost' options={{ headerShown: false }}/>
        <Stack.Screen name='(chatting)/ChatScreen' options={({ route }) => ({
          title: route.params.name,
          headerBackVisible: false,
          headerLargeTitle: true,
          headerRight: () => (
            <View className="flex flex-row w-1/2 p-0 m-0 h-full justify-around">
              <TouchableOpacity onPress={() => Alert.alert("Alert", "Block?")}>
                <Ionicons name='notifications-off-outline' color={'white'} size={25}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Alert", "Info displaying")}>
                <Ionicons name='information-circle-outline' color={'white'} size={25}/>
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 24
          }
        })}/>
        <Stack.Screen name='CreatePoll' options={{ headerShown: false }}/>
        <Stack.Screen name='poll-positions' options={{ headerShown: false }}/>
        <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
        <Stack.Screen name='search/[query]' options={{ headerShown: false }}/>
      </Stack>
    </AuthProvider>
  )
}

export default RootLayout