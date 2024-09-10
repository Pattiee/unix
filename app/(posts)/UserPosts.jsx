import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const UserPosts = () => {
    const { userId } = useLocalSearchParams();
    const uid = JSON.parse(userId);


    return (
        <View>
        <Text>Displaying posts for user, userId: {uid}</Text>
        </View>
    )
}

export default UserPosts