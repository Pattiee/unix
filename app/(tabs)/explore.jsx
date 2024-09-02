import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'


const Explore = () => {
  return (
    <SafeAreaView className="p-4 border border-primary h-full w-full">
        <ScrollView>
            <View>
                <Text className="text-3xl font-bold m-4">Explore</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Explore