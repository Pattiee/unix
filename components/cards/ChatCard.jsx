import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '../../constants/images'
import { router } from 'expo-router'
import MessageService from '../../services/message.service'
import useServer from '../../hooks/useServer'
import { useAuth } from '../../contexts/AuthProvider'
import { Ionicons } from '@expo/vector-icons'


const ChatCard = ({ chat }) => {

    return(
      <TouchableOpacity className="flex bg-slate-300 h-17 flex-row w-full py-2 justify-center items-center max-w-[100vw] my-1" onPress={() => router.push({ pathname: 'ChatScreen', params: { chatId: JSON.stringify(chat?.id), name: chat?.respPhone} })}>
        <View className="flex bg-slate-700 justify-center items-center w-[60px] h-[60px] m-0 rounded-full">
          { chat?.respAvatar ?? <Ionicons name='person-circle-outline' size={30} color={'white'}/> }
        </View>

        <View className="flex flex-col w-[80%] px-3">
          <View className="flex flex-row justify-between h-7">
            <Text className="flex flex-nowrap font-psemibold text-lg text-slate-800 dark:text-white">{chat?.respPhone}</Text>
            <Text className="text-slate-600 dark:text-slate-300">{chat?.timestamp}</Text>
          </View>

          <View className="flex flex-row justify-between h-7">
            <Text className={` text-slate-600 dark:text-slate-300 text-lg flex-nowrap ${chat?.unreadMsgCount > 0 ? 'font-pbold text-white' : ''}`}>{chat?.messagePreview}</Text>
            { chat?.unreadMsgCount > 0 ? <Text className="flex bg-green-800 justify-center items-center center text-white w-[21px] h-[21px] rounded-full">{chat?.unreadMsgCount}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

export default ChatCard