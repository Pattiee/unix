import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <SafeAreaView className="h-full w-full">
        <ScrollView>
            <View>
                <Text>Settings</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Settings