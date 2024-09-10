import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import MessageService from '../services/message.service'
import { useAuth } from '../contexts/AuthProvider'

const ChatEntry = ({ destinationName, chatId }) => {
  const { user, setMsgUpdated } = useAuth();
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef(null);

  const sendMessage = async () => {
    const fName = user?.firstName;
    
    if (!fName || !message) {
      Alert.alert("ERROR", "Some values are empty,");
      return;
    }

    const messageBody = {
      content: message,
    }

    MessageService.sendMessageExistingChat(messageBody, chatId, fName).then((res) => {
      setMsgUpdated(true);
      Alert.alert("SUCCESS", "Good,");
    }).catch((err) => {
      Alert.alert("PROBLEM", "Just problems345354,");
    }).finally(() => {
      setMsgUpdated(false);
    });
  }


  return (
    <View className="min-h-[150px] rounded-b-lg rounded-t-3xl">
      {
        isFocused && (
        <View className="flex bg-primary justify-around flex-row rounded-t-3xl items-center h-[35px]">
          <Ionicons name='image-outline' color={'white'} size={20}/>
          <Text className="text-white font-psemibold text-xl">{destinationName}</Text>
          <Ionicons name='add-circle-outline' color={'white'} size={20}/>
        </View>)

      }

      <View className="h-[115px] w-full">
        <View className="w-7/10 bg-purple-500">
          <TouchableOpacity className="absolute z-50 bottom-2 right-3 justify-center items-center opacity-100 rounded-lg w-[45px] h-[37px] bg-primary" onPress={() => sendMessage()}>
            <Ionicons name='send-outline' color={'white'} size={20}/>
          </TouchableOpacity>

          <TextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={message}
            onChangeText={(val) => setMessage(val)}
            ref={textInputRef}
            className="flex h-full text-base flex-wrap px-4"
            multiline/>
        </View>

        <View>
          
        </View>
      </View>
    </View>
  )
}

export default ChatEntry