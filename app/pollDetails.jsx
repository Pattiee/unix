import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';


const PollDetails = () => {
    const { poll } = useLocalSearchParams();
    const pollItem = JSON.parse(poll);


    return (
        <View className="flex h-full w-full justify-center">
            <Text className="text-3xl m-4">{pollItem?.institution}</Text>
            <FlatList
                scrollEventThrottle={16}
                className="h-full w-full p-0 m-0"
                data={pollItem?.positions ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity className="bg-primary my-1 px-4 py-2 h-[20vh] rounded-xl" onPress={() => router.push({ pathname: 'poll-positions', params: { position: JSON.stringify(item)} })}>
                        <Text className="text-xl">{item.title}</Text>
                        <Text>This position has {pollItem.positions.length} candidates</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default PollDetails