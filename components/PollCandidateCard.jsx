import { View, Text } from 'react-native'
import React from 'react'

const PollCandidateCard = ({ candidate }) => {
  return (
    <View>
      <Text>{candidate?.name}</Text>
    </View>
  )
}

export default PollCandidateCard