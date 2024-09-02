import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { images } from '../constants/images';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.logo} className="w-[270px] h-[215px]" resizeMode='contain'/>
      <Text className="text-xl text-center font-psemibold text-white mt-2">{title}</Text>
      <Text className="text-sm text-gray-100 font-pmedium">{subTitle}</Text>
      <CustomButton title={"Create video"} handlePress={() => router.push('/create')} containerStyles="w-full my-5"/>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({});