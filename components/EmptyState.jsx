import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { images } from '../constants/images';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthProvider';
import { Ionicons } from '@expo/vector-icons';


const EmptyState = ({ title, subTitle, itemName }) => {
  const { user } = useAuth();



  return (
    <View className="justify-center items-center px-4 bg-green-600">
      <Ionicons name='eye-off-outline' size={60} color={'white'}/>
      <Text className="text-xl text-center font-psemibold text-white mt-2">{title}</Text>
      <Text className="text-sm text-gray-100 font-pmedium">{subTitle}</Text>
      <CustomButton title={itemName ?? "Create one"} handlePress={() => router.push({ pathname: 'CreatePost', params: { userId: JSON.stringify(user.id) } })} containerStyles="w-full my-5"/>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({});