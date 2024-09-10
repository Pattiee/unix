import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../contexts/AuthProvider'
import ChatCard from '../../components/ChatCard'
import ChatFlatListHeader from '../../components/ChatFlatListHeader'
import ChatService from '../../services/chat.service'
import useServer from '../../hooks/useServer'
import EmptyState from '../../components/EmptyState'
import SecureStoreService from '../../services/secureStore'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'



const Chats = () => {

  const { user, isLoggedIn, msgUpdated } = useAuth();

  const { data: chats, refetch } = useServer(() => ChatService.getUserChats(user?.firstName));

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );


  const handleCreateChat = async () => {
    Alert.alert("Alert", "Attempting to create new chat")
  }


  const listFooterComponent = () => {
    return(
      <View className="h-[50vh] bg-black">
        {/* <TouchableOpacity className="flex flex-row rounded-lg bg-primary w-1/3 justify-center items-center">
          <Ionicons name='add-circle-outline' size={37} color={'white'}/>
          <Text className="text-white px-2 py-1 text-2xl">Chat</Text>
        </TouchableOpacity> */}
      </View>
    )
  }


  return (
    <SafeAreaView className="h-full w-full">

      <TouchableOpacity className="flex py-2 absolute z-50 bottom-10 right-5 flex-row rounded-lg bg-primary w-1/3 justify-center items-center" onPress={() => router.push({ pathname: 'Contacts', })}>
        <Ionicons name='add-circle-outline' size={35} color={'white'}/>
        <Text className="text-white px-2 py-1 text-2xl">Chat</Text>
      </TouchableOpacity>

      <FlatList
        data={chats}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (<ChatCard chat={item}/>)}
        ListHeaderComponent={(item) => (<ChatFlatListHeader chat={item}/>)}
        ListEmptyComponent={() => (<EmptyState title={'Empty'} subTitle={'No chats found'} itemName={'Create chat'}/>)}
        ListFooterComponent={() => listFooterComponent()}
      />
    </SafeAreaView>
  )
}

export default Chats