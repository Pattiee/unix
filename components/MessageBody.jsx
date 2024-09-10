import { View, Text } from 'react-native'
import React from 'react'

const MessageBody = ({ message }) => {
  return (
    <View className="h-[70px] w-full bg-primary my-1">
      <Text className="">{message?.message}</Text>
    </View>
  )
}

export default MessageBody