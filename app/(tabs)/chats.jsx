import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const Chats = () => {
  return (
    <SafeAreaView className="h-full w-full">
        <ScrollView className="h-full w-full">
            <View className="h-[100vh] w-full">
                <Text>Messages</Text>
                <View>
                    <Text>Recent Messages</Text>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Chats