import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../contexts/AuthProvider'



const ChatFlatListHeader = ({ chat }) => {
    const { user } = useAuth();


  return (
    <View className="flex flex-col h-[80px] w-full bg-primary justify-between border-b items-center px-4">
        {/* For other icons */}
        <View className="flex py-1 w-full h-1/2 flex-row justify-between items-center">
            <View className="flex justify-center items-center h-full px-1 w-1/4">
                <TouchableWithoutFeedback>
                    <Text className="text-white capitalize text-lg">Unix</Text>
                </TouchableWithoutFeedback>
            </View>

            <View className="flex justify-center items-center h-full px-1 w-1/4">
                <TouchableOpacity>
                    <Ionicons name='airplane-outline' color={'white'} size={25}/>
                </TouchableOpacity>
            </View>

            <View className="flex justify-center items-center h-full px-1 w-1/4">
                <TouchableOpacity>
                    <Ionicons name='moon' color={'white'} size={25}/>
                </TouchableOpacity>
            </View>
        </View>

        <View className="flex py-1 flex-row justify-between items-center w-full h-1/2">
            <View className="flex justify-center w-1/2">
                <Text className="text-white text-3xl w-full capitalize font-psemibold">{user?.firstName}</Text>
            </View>

            <View className="flex justify-center items-center h-full w-1/5">
                <TouchableOpacity className="flex flex-row justify-center items-center h-[40px] rounded-lg p-2 w-[40px] my-1">
                    <Ionicons role='search' size={22} name='search-outline' color={'white'}/>
                </TouchableOpacity>
            </View>

            <View  className="flex justify-center items-center h-full w-1/5">
                <TouchableOpacity className="flex justify-center items-center h-[40px] rounded-lg p-2 w-[40px] my-1">
                    <Ionicons role='menu' size={25} name='settings-outline' color={'white'}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default ChatFlatListHeader