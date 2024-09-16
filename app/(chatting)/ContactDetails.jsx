import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const ContactDetails = () => {
  const { phone } = useLocalSearchParams();
  const parsedPhoneNumber = JSON.parse(phone);
  const [contact, setContact] = useState(null);

  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-slate-800">
      <ScrollView>
        <View className="bg-green-400 h-[50vh]">
          <View></View>
          <View className="bg-purple-500 flex items-center rounded-full justify-center w-36 h-36 self-center">
            {contact?.avatar ? (<Ionicons/>) : (<Ionicons name='person-outline' size={110}/>)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ContactDetails