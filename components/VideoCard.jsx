import { View, Text, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ videoRefs, index, video: { title, thumbnail, video, creator: { username, avatar }}}) => {

    const handlePress = async(idx) => {
        const videoRef = videoRefs?.current[idx];
        if (videoRef) {
            const status = await videoRef.getStatusAsync();
            if (status?.isPlaying) {
                await videoRef.pauseAsync();
            } else {
                await videoRef.playAsync();
            }
        }
    }


  return (
    <TouchableWithoutFeedback onPress={() => handlePress(index)}>
    <View className="flex-col h-[100vh] w-full m-0 p-0 border border-green-900">
        <View className="flex-row gap-0 absolute z-50 items-start bottom-0 rounded-xl">
            <View className="justify-center items-center flex-row flex-1">

                <View className="w-[46px] h-[46px] rounded-full justify-center items-center p-0.5">
                    <Image source={{ uri: avatar}} className="w-full h-full rounded-full" resizeMode='cover'/>
                </View>

                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
                </View>

            </View>

            <View className="pt-2">
                <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
            </View>

        </View>

        {/* Show the video  below*/}
        <Video
            ref={ref => {
                videoRefs.current[index] = ref;
            }}
            source={{ uri: video }}
            className="flex-1 w-full h-full m-0 p-0 justify-center items-center"
            resizeMode={ResizeMode.COVER}
            shouldPlay={false}
            isLooping
            style={{ width: '100%', height: '100%'}}
        />
    </View>
    </TouchableWithoutFeedback>
  )
}

export default VideoCard