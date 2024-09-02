import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

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