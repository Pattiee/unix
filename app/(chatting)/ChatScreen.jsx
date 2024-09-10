import { View, Text, FlatList, ScrollView, Button, Alert } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router'
import ChatMessageCard from '../../components/ChatMessageCard'
import ChatScreenHeader from '../../components/ChatScreenHeader'
import ChatService from '../../services/chat.service'
import useServer from '../../hooks/useServer'
import {useAuth } from '../../contexts/AuthProvider'
import EmptyState from '../../components/EmptyState'
import MessageService from '../../services/message.service'
import ChatEntryBox from '../../components/ChatEntryBox'
import { Ionicons } from '@expo/vector-icons'



const ChatScreen = () => {

    const { name } = useLocalSearchParams()
    const { user, msgUpdated } = useAuth();
    const { chatId } = useLocalSearchParams();
    const cid = JSON.parse(chatId);
    const [chat, setChat] = useState(null);
    const flatListRef = useRef(null);

    const [contentHeight, setContentHeight] = React.useState(0);
    const [flatListHeight, setFlatListHeight] = React.useState(0);

    const { data: messages, refetch } = useServer(() => MessageService.readChatMessages(cid, user?.firstName));

    const getChat = async() => {
        ChatService.getChatById(cid, user?.firstName).then((res) => {
            setChat(res);
        }).catch((err) => {

        }).finally(() => {
            if (messages.length === 0) {
                refetch();
            }
        });
    };

    useEffect(() => {
        getChat();
    }, [cid, user]);


    const scrollToBottom = () => {
        if (flatListRef.current) {
            // flatListRef.current.scrollToOffset({
            //     offset: contentHeight - flatListHeight,
            //     animated: true
            // });
            flatListRef.current.scrollToEnd({
                animated: true
            });
        }
    }


    useFocusEffect(
        React.useCallback(() => {
            refetch()
            scrollToBottom();
        }, [msgUpdated, flatListHeight])
    )


    const messageCard = (msg) => {
        return(
            <View className="flex shadow-xl shadow-slate-500 flex-col h-[150px] justify-between mb-3 rounded-3xl mx-2 bg-primary">
                <View className="px-4 pt-2">
                    <Text className="text-white text-base">{msg?.content}</Text>
                </View>
                <View className="w-full rounded-b-3xl h-[24px] px-4 flex-row items-center bg-gray-800 justify-around">
                    <Text className="text-white">{msg?.timestamp}</Text>
                    <Text className="text-white">{msg?.isRead ? <Ionicons name='open-outline' size={19} color={'blue'}/> : <Ionicons name='mail-open-outline' size={19} color={'gray'}/>}</Text>
                </View>
            </View>
        );
    }



    return (
        <SafeAreaView className="h-full w-full">
            <FlatList
                className="mt-20"
                data={messages ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => messageCard(item)}
                ref={flatListRef}
                onContentSizeChange={() => scrollToBottom()}
                onLayout={(e) => setFlatListHeight(e.nativeEvent.layout.height)}
                ListFooterComponent={() => (<View className="h-[300px] bg-black"></View>)}
            />
            <ChatEntryBox destinationName={name} chatId={cid} refetchMessages={refetch}/>
        </SafeAreaView>
    )
}

export default ChatScreen