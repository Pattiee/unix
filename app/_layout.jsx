import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import AuthProvider from '../contexts/AuthProvider'
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ContactsUtil from '../utils/ContactsUtil';


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

  const [syncingContacts, setSyncingContacts] = useState(false);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;



  const handleSynchronizeContacts = async () => {
    setSyncingContacts(true);
    await ContactsUtil.synchronizeContacts();
    setSyncingContacts(false);
  }


  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }}/>
        <Stack.Screen name='pollDetails' options={{ headerShown: false }}/>
        <Stack.Screen name='(posts)/UserPosts' options={{ headerShown: false }}/>
        <Stack.Screen name='(chatting)/ContactDetails' options={({ route }) => ({
          title: route?.params?.name,
          headerBackVisible: false,
        })}/>
        <Stack.Screen name='(chatting)/Contacts' options={({ route }) => ({
          headerShown: true,
          title: "Contacts",
          headerBackVisible: false,
          headerTransparent: true,
          headerTitle: 'Contacts',
          headerRight: () => (
            <TouchableOpacity className="px-4" onPress={() => handleSynchronizeContacts()} disabled={syncingContacts}>
              <Ionicons name='sync-outline' size={24} color={'gray'}/>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 26,
          }
        })}/>
        <Stack.Screen name='(posts)/CreatePost' options={{ headerShown: false }}/>
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
        <Stack.Screen name='(polls)/create-poll' options={{ headerShown: false }}/>
        <Stack.Screen name='poll-positions' options={{ headerShown: false }}/>
        <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
        <Stack.Screen name='search/[query]' options={{ headerShown: false }}/>
      </Stack>
      <StatusBar backgroundColor='#161616' style='auto'/>
    </AuthProvider>
  )
}

export default RootLayout