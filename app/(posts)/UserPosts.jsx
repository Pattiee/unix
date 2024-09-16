import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserPosts = () => {
    const { userId } = useLocalSearchParams();
    const uid = JSON.parse(userId);


    return (
        <SafeAreaView>
            <Text>Displaying posts for user, userId: {uid}</Text>
        </SafeAreaView>
    )
}

export default UserPosts