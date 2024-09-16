import { View, Text, FlatList, ScrollView, TouchableOpacity, Button, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { images } from '../../constants/images'
import { Image } from 'react-native'
import icons from '../../constants/icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logout } from '../../services/auth.service'
import { Ionicons } from '@expo/vector-icons'
import SecureStoreService from '../../services/secureStore'
import * as SecureStore from 'expo-secure-store'
import useServer from '../../hooks/useServer'
import useSingleDataServer from '../../hooks/useSingleDataServer'
import { getUserProfile } from '../../services/user.service'
import { styled, useColorScheme } from 'nativewind'
import { logoutLocal } from '../../db'


const StyledPressable = styled(Pressable);
const StyledText = styled(Text);


const Profile = () => {

  const { isLoggedIn, setIsLoggedIn, user, setUser, isLoading, } = useAuth();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    if(isLoggedIn && user != null){
      getUserProfile(user.firstName).then((res) => {
      if (res) {
        setProfile(res.data);
      }});
    }
  }, [user]);


  // const requestLogout = async() => {
  // <Button
  //     title='Click me'
  //     onPress={() => {
  //       Alert.alert("Title", "Message", [
  //         {text: "No", onPress: () => console.log("No")},
  //         {text: "Yes", onPress: () => console.log("Yes")},
  //       ]);
  //     }}
  //   />
  // }


  const logoutUser = async () => {
    await logout().then((res) => {
      setUser(null);
      setIsLoggedIn(false);
      setMessage(res.data);
      logoutLocal();
      router.replace('/login');
      Alert.alert("Message", res.data);
    }).catch((err) => {
      Alert.alert("Message", err?.message);
    }).finally(() => {
      if (!user && !isLoggedIn) {
        router.replace('/login');
      }
    });
  }


  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-slate-600 ring-1 ring-slate-900/5">
      <ScrollView>

        {/* User info */}
        <View className="w-full h-[55vh] rounded-t-lg pt-4">
          <View className="h-[10%] flex flex-row w-full justify-between">
            {/* Logout */}
            <StyledPressable className="flex w-9 h-9 rounded-full mr-4 justify-center items-center" onPress={toggleColorScheme}>
              <StyledText>
                {colorScheme === 'dark' ? (<Ionicons className="mx-1" size={32} color={'red'} name='sunny-outline'/>) : (<Ionicons className="mx-1" size={32} color={'red'} name='moon-outline'/>)}
              </StyledText>
            </StyledPressable>

            {/* Logout */}
            <TouchableOpacity className="flex w-9 h-9 rounded-full mr-4 justify-center items-center" onPress={logoutUser}>
              <Ionicons className="mx-1" size={32} color={'red'} name='log-out-outline'/>
            </TouchableOpacity>
          </View>

          <View className="h-[90%] pt-10 pb-10">
            <View className="flex h-1/2 justify-center items-center">
              <TouchableOpacity className="w-20 h-20 rounded-full justify-center items-center">
                  <Image source={images?.logo2} className="w-full h-full center rounded-full"/>
              </TouchableOpacity>
              <Text className="capitalize text-3xl py-2 px-4 text-slate-800 dark:text-white">{profile?.name}</Text>
            </View>

            {/* Any other info */}
            <View className="flex h-1/2">
              {/* Test btn */}
              {/* <Button
                title='Click me'
                onPress={() => {
                  Alert.alert("Title", "Message", [
                    {text: "No", onPress: () => console.log("No")},
                    {text: "Yes", onPress: () => console.log("Yes")},
                  ]);
                }}/> */}
              {/* End of test btn */}
              <View className="flex flex-col h-[70%] justify-center items-center">
                <View className="flex px-4 rounded-lg flex-row items-center justify-center">
                  <Ionicons className="mx-1" size={18} name='call-outline' color={'red'}/>
                  <Text className="py-2 mx-2 text-lg text-slate-500 dark:text-slate-100">{profile?.phone}</Text>
                </View>

                <View className="flex px-4 rounded-lg flex-row items-center justify-center">
                  <Ionicons className="mx-1" size={18} name='mail-outline' color={'red'}/>
                  <Text className="py-2 mx-2 text-lg text-slate-500 dark:text-slate-100">{profile?.email}</Text>
                </View>
              </View>

              <View className="flex flex-row justify-around items-center h-[30%] bg-white dark:bg-slate-500 rounded-lg ml-2">
                <View className="flex flex-row justify-center items-center h-full w-1/2">
                  <Image className="h-[20px] w-[20px] m-1" source={icons.eye}/>
                  <Text className="text-xl text-slate-800 dark:text-slate-100">Followers {user?.followers ?? 0}</Text>
                </View>
                <View className="flex flex-row justify-center items-center h-full w-1/2">
                  <Image className="h-[20px] w-[20px] m-1" source={icons.eye}/>
                  <Text className="text-xl text-slate-800 dark:text-slate-100">Following {user?.following ?? 0}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* User's Posts and Polls  */}
        <View className="">

          {/* Posts */}
          <View className="h-[40vh] mb-10 w-full p-0">
            <TouchableOpacity className="h-3/4 w-full" onPress={() => router.push({ pathname: 'UserPosts', params: { userId: JSON.stringify(user?.id) }})}>
              <View className="flex flex-row opacity-40 bg-slate-900 absolute z-50 h-full justify-center items-center p-0 m-0">
                <View className="flex h-full w-1/2 justify-center items-center">
                  <Text className="flex text-2xl pt-5 px-4 text-white">98</Text>
                  <Text className="flex text-3xl py-2 px-4 text-white font-pextralight">Posts</Text>
                </View>
                <View className="flex h-full w-1/2 justify-center items-center">
                  <Text className="flex text-2xl pt-5 px-4 text-white">100.7m</Text>

                  <View className="flex flex-row justify-center px-4 items-center">
                    <Ionicons size={27} name='heart-outline' color={'white'}/>
                    <Text className="flex text-3xl py-2 px-1 text-white font-pextralight">Likes</Text>
                  </View>
                </View>
              </View>

              <View className="w-full">
                <Image className="h-full w-full" source={images.bg3}/>
              </View>
            </TouchableOpacity>

              {/* New Post */}
            <View className="flex h-1/4 w-full justify-center items-center">
              <TouchableOpacity className="flex bg-slate-900 w-full h-full justify-center items-center" onPress={() => router.push({ pathname: 'CreatePost', params: { userId: JSON.stringify(user?.id)}})}>
                <Text className="text-5xl px-4 py-2 rounded-xl text-slate-800 dark:text-white">New Post</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Polls */}
          <View className="h-[40vh] mb-10 w-full p-0">
            <TouchableOpacity className="h-3/4 w-full" onPress={() => router.push({ pathname: 'UserPolls', params: { userId: JSON.stringify(user.id) } })}>
              <View className="flex z-50 absolute opacity-40 flex-row bg-slate-900 h-full justify-center items-center p-0 m-0">
                <View className="flex h-full w-1/2 justify-center items-center">
                  <Text className="flex text-2xl pt-5 px-4 text-white">9</Text>
                  <Text className="flex text-3xl py-2 px-4 text-white font-pextralight">Polls</Text>
                </View>
                <View className="flex h-full w-1/2 justify-center items-center">
                  <Text className="flex text-2xl pt-5 px-4 text-white">10k</Text>
                  <Text className="flex text-3xl py-2 px-4 text-white font-pextralight">Votes</Text>
                </View>
              </View>

              {/* Poll Image */}
              <View className="h-full w-full">
                <Image className="w-full h-full" source={images.bg4}/>
              </View>
            </TouchableOpacity>

            <View className="flex h-1/4 w-full justify-center items-center">
              <TouchableOpacity className="flex bg-slate-900 w-full h-full justify-center items-center" onPress={() => router.push({ pathname: 'create-poll', params: { userId: JSON.stringify(user.id) } })}>
                <Text className="text-5xl px-4 py-2 rounded-xl text-slate-800 dark:text-white">New Poll</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile