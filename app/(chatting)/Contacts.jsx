import { View, Text, Button, Alert, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import { useTailwind } from 'tailwind-rn';
import ContactItemCard from '../../components/cards/ContactItemCard'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ContactsUtil from '../../utils/ContactsUtil';
import { router, useNavigation } from 'expo-router';
import { useAuth } from '../../contexts/AuthProvider'


const ContactsScreen = () => {
  const { contactsUpdated, setContactsUpdated } = useAuth();
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showHeader, setShowHeader] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  scrollY.addListener(({ value }) => {
    if (value > 50) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  });


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => {
          const query = event.nativeEvent.text;
          setSearchQuery(query);
        },
        placeholder: 'Search contacts... '
      }
    });
  }, [navigation]);


  const loadSyncedContacts = async () => {
    const loadedContacts = await ContactsUtil.loadContacts();
    if (searchQuery.trim() === '') {
      setContacts(loadedContacts);
    } else{
      setContacts(loadedContacts.filter(contact => contact?.name?.toLowerCase().includes(searchQuery?.toLowerCase().trim()) || contact?.phoneNumber?.includes(searchQuery?.trim())));
    }
    setContactsUpdated(false);
  };

  useEffect(() => {
    loadSyncedContacts();
  }, [searchQuery, contactsUpdated]);


  const contactRenderItem = (item) => (<ContactItemCard key={item.id} name={item.name} phoneNumber={item.phoneNumber}/>);

  const listFooterComponent = () => (
    <View className="w-full h-[300px]">
      <Text className="w-full text-3xl font-psemibold">You have reached the end of the list</Text>
    </View>
  );


  return (
    <SafeAreaView className="bg-white h-full pt-16 dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl">
      <GestureHandlerRootView>
      {/* { showHeader && (
        <View className="absolute w-full bg-red-500 p-4 z-10">
          <SearchInput placeholder={"Search contacts"}/>
        </View>
      )} */}

        {/* FlatList */}
        <Animated.FlatList
          data={contacts ?? []}
          keyExtractor={(item) =>  item?.id}
          renderItem={({ item }) => contactRenderItem(item)} // return to contactRenderItem if fails
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY }}}],
            { useNativeDriver: true }
          )}
          // ListHeaderComponent={<View style={tailwind('h-16')}/>}
          initialNumToRender={10}
          windowSize={5}
          removeClippedSubviews={true}
          listFooterComponent={() => listFooterComponent()}
          scrollEnabled={scrollEnabled}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default ContactsScreen