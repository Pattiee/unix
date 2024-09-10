import { View, Text } from 'react-native'
import React from 'react'

const ChatMessageCard = ({ message }) => {
  return (
    <View className="bg-green-300 my-2 px-4 py-2">
      <Text className="text-white text-lg text-wrap">{message.content}</Text>
    </View>
  )
}

export default ChatMessageCard