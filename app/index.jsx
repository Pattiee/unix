import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '../contexts/AuthProvider';
import { Redirect, router } from 'expo-router';
import { images } from "../constants/images";
import CustomButton from '../components/CustomButton';



export default function App(){

    const { isLoading, isLoggedIn } = useAuth();

    if(!isLoading && isLoggedIn) return <Redirect href="/home"/>

    return(
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">

                <Image
            source={images.logo2}
            className="w-[130px] h-[130px] rounded-full m-0 p-2"
            resizeMode="contain"
          />

          {/* <Image
            source={images.bg3}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          /> */}

          <View className="relative mt-5">
            <Text className="text-3xl text-black-100
             font-bold text-center">
              Discover endless possibilities with {' '}
              <Text className="text-primary">Unix</Text>
            </Text>
          </View>


          <Text className="text-sm font-pregular text-gray-700 mt-7 text-center">Where creativity meets innovation: 
            embark on a journey with limitless exploration
            with us
          </Text>

          <CustomButton
            title="Continue with email"
            handlePress={() => (router.push("/(auth)/login"))}
            containerStyles="w-full mt-7"
          />


                </View>
            </ScrollView>

            <StatusBar backgroundColor='#161616' style='light'/>
        </SafeAreaView>
    )
}