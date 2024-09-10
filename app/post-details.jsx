import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const PostDetails = () => {
  return (
    <SafeAreaView className="h-full w-full">
        <ScrollView>
            <View>
                <Text>Post Details</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default PostDetails