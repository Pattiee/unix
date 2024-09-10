import { View, Text } from 'react-native'
import React from 'react'

const ChatScreenHeader = ({ chat }) => {
  return (
    <View className="h-[100px] bg-primary px-4 py-2">
      <Text className="text-2xl text-white">{chat?.respPhone}</Text>
    </View>
  )
}

export default ChatScreenHeader