import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


const CreatePoll = () => {
  const { userId } = useLocalSearchParams();
  const uid = JSON.parse(userId);


  return (
    <View>
      <Text>CreatePoll, UID: {uid}</Text>
    </View>
  )
}

export default CreatePoll