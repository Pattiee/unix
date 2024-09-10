import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '../constants/images'
import { router } from 'expo-router'
import MessageService from '../services/message.service'
import useServer from '../hooks/useServer'
import { useAuth } from '../contexts/AuthProvider'
import { Ionicons } from '@expo/vector-icons'


const ChatCard = ({ chat }) => {

    return(
      <TouchableOpacity className="flex flex-row w-full justify-around h-[77px] pr-4 pl-2 py-3" onPress={() => router.push({ pathname: 'ChatScreen', params: { chatId: JSON.stringify(chat?.id), name: chat?.respPhone} })}>
        <View className="flex justify-center items-center w-[53px] h-full mx-2 bg-green-400 rounded-full">
          { chat?.respAvatar ?? <Ionicons name='person-circle-outline' size={30} color={'white'}/> }
        </View>

        <View className="flex flex-col w-[80%]">
          <View className="flex flex-row justify-between">
            <Text className="flex flex-nowrap font-psemibold text-lg">{chat?.respPhone}</Text>
            <Text className="text-gray-400">{chat?.timestamp}</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Text className={` text-gray-500 text-lg ${chat?.unreadMsgCount > 0 ? 'font-pbold text-white' : ''}`}>{chat?.messagePreview}</Text>
            { chat?.unreadMsgCount > 0 ? <Text className="flex bg-green-800 justify-center items-center center text-white w-[21px] h-[21px] rounded-full">{chat?.unreadMsgCount}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

export default ChatCard