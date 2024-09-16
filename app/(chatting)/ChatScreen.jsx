import { View, Text, FlatList, ScrollView, Button, Alert } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router'
import ChatScreenHeader from '../../components/ChatScreenHeader'
import ChatService from '../../services/chat.service'
import useServer from '../../hooks/useServer'
import {useAuth } from '../../contexts/AuthProvider'
import EmptyState from '../../components/EmptyState'
import MessageService from '../../services/message.service'
import ChatEntryBox from '../../components/ChatEntryBox'
import { Ionicons } from '@expo/vector-icons'
import MessageCard from '../../components/cards/MessageCard'



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



    const MessageItem = React.memo(({ sender, content, timestamp, isRead }) => {
        return(
            <View className={`flex w-[80vw] ${sender ? 'bg-slate-300 self-end' : 'bg-slate-100 self-start'} mx-2 dark:bg-slate-800 border border-slate-100 shadow-2xl shadow-slate-700 flex-col justify-between mb-3 rounded-3xl`}>
                <Text className="text-slate-700 font-pregular dark:text-white text-base py-2 px-3">{content}</Text>
                <View className={`w-full ${sender ? 'bg-slate-500 self-end' : 'bg-slate-300 self-start'} rounded-b-3xl min-h-[24px] px-4 flex-row items-center justify-around`}>
                    <Text className=" text-slate-800 dark:text-white">{timestamp}</Text>
                    <Text className=" text-slate-800 dark:text-white">{isRead ? <Ionicons name='open-outline' size={19} color={'blue'}/> : <Ionicons name='mail-open-outline' size={19} color={'black'}/>}</Text>
                </View>
            </View>
        );
    });


    const messageCard = (msg) => (<MessageItem sender={msg.sender} content={msg.content} timestamp={msg.timestamp} isRead={msg.isRead}/>);



    return (
        <SafeAreaView className="h-full w-full bg-white dark:bg-slate-600 ring-1 ring-slate-900/5">
            <FlatList
                className="m-0"
                data={messages ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<MessageCard sender={item.sender} content={item.content} timestamp={item.timestamp} isRead={item.isRead}/>)}
                ref={flatListRef}
                onContentSizeChange={() => scrollToBottom()}
                onLayout={(e) => setFlatListHeight(e.nativeEvent.layout.height)}
                initialNumToRender={10}
                windowSize={5}
                removeClippedSubviews={true}
                // ListFooterComponent={() => (<View className="h-[100px] bg-white dark:bg-slate-700"></View>)}
            />
            <ChatEntryBox destinationName={name} chatId={cid} refetchMessages={refetch}/>
        </SafeAreaView>
    )
}

export default ChatScreen