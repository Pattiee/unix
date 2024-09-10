import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


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