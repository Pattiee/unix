import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts';
import { MMKV } from 'react-native-mmkv';


const storage = new MMKV();

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  const saveContactsToMMKV = async (contacts) => {
    const jsonContacts = JSON.stringify(contacts);
    storage.set("contacts", jsonContacts);
  }

  const loadContactsFromMMKV = async() => {
    const jsonContacts = storage.getString("contacts");
    return jsonContacts != null ? JSON.parse(jsonContacts) : [];
  }


  const syncContacts = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
        saveContactsToMMKV(data);
      }
    }
  }


  useEffect(() => {
    const localContacts = loadContactsFromMMKV();
    setContacts(localContacts);
    syncContacts();
  }, [])





  return (
    <View className="bg-black-100 w-full">
      {
        contacts.map((contact, index) => (
          <Text key={index}>{contact?.name}</Text>
        ))
      }
      <Button title="Sync contacts" onPress={syncContacts}/>
    </View>
  )
}

export default ContactsScreen