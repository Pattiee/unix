import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


const UserPolls = () => {
    const { userId } = useLocalSearchParams();
    const uid = JSON.parse(userId);




    return (
        <View>
        <Text>UserPolls, UID: {uid}</Text>
        </View>
    )
}

export default UserPolls