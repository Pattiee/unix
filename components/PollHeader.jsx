import { View, Text } from 'react-native'
import React from 'react'
import { images } from '../constants/images'
import { Image } from 'react-native'
import SearchInput from './SearchInput'


const PollHeader = ({ poll }) => {
  return (
    <View className="my-6 px-4 space-y-6 border">
      <View className="justify-between items-start flex-row mb-6">

        <View className="">
          <Text className="text-sm text-gray-100 font-pmedium">Institution, </Text>
          <Text className="text-2xl font-psemibold text-white">{poll?.institution}</Text>
        </View>

        <View className="mt-1.5">
          <Image
            source={images.logo2}
            className="w-9 h-10"
            resizeMode='contain'
          />
        </View>
      </View>

      {/* <SearchInput placeholder={"Search for a video topic"}/> */}

      {/* Latest videos section */}
      {/* <View className="w-full flex-1 pt-5 pb-8">
        <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
        <Trending posts={latestPosts ?? []}/>
      </View> */}
    </View>
  )
}

export default PollHeader