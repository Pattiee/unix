import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


const CreatePost = () => {
    const { userId } = useLocalSearchParams();
    const uid = JSON.parse(userId);

    return (
        <View>
        <Text>CreatePost for user, UID: {uid}</Text>
        </View>
    )
}

export default CreatePost