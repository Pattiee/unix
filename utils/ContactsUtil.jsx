import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from 'expo-contacts'
import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../contexts/AuthProvider";


const CONTACTS_KEY = 'contacts';


const validateContacts = (contacts) => {
  // TODO: Validate contacts here,
  return contacts;
}


const mergeComplexContacts = (localContacts, deviceContacts) => {
  // Merge contacts and return accumulator
  const mergedContacts = [...localContacts, ...deviceContacts].reduce((acc, contact) => {
    const phoneNumbers = contact?.phoneNumbers || [];
    if (!acc.find(c => c.phoneNumbers && phoneNumbers.some(pn => c.phoneNumbers.includes(pn)))) {
      acc.push(contact);
    }
    return acc;
  }, []);

}


// Merge array of contacts
const mergeContacts = async (localContacts, deviceContacts) => {
  const merged = [...localContacts];

  deviceContacts.forEach(deviceContact => {
    const exists = merged.some(localContact => localContact.phoneNumber === deviceContact.phoneNumber);

    if (!exists) {
      merged.push({
        id: deviceContact.id,
        name: deviceContact.name,
        phoneNumber: deviceContact.phoneNumber,
      });
    }
  });

  return merged;
}


// Function to transform contacts list
const transformContacts = (contacts) => {

  // TODO: Check if contact doesn't have a phone number don't save it in contacts
    return contacts.flatMap(contact =>
        contact?.phoneNumbers?.map((number, index) => ({
            id: `${contact?.id}-${contact?.name?.replace(/ /g, '')}-${index}`,
            name: contact?.name,
            phoneNumber: number.replace(/ /g, ''),
        }))
    );
};


const removeDuplicateContacts = (contacts) => {
  // Use reduce to accumulate unique contacts based on phone number.
  return contacts.reduce((acc, currentValue) => {
    // Check if the phone number already exist in the accumulator
    if (currentValue?.phoneNumber != undefined && currentValue?.phoneNumber != null) {
      const isDuplicate = acc.some(contact => contact?.phoneNumber === currentValue?.phoneNumber);
      // If it's not a duplicate add it to the accumulator;
      if (!isDuplicate && currentValue != undefined) {
        acc.push(currentValue);
      }
    }
    return acc;
  }, []);
};


// Fetch Contacts
export const fetchContacts = async() => {
    try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data && data.length > 0) {
                return data?.map(contact => ({
                    id: contact?.id,
                    name: contact?.name || "Unknown",
                    phoneNumbers: contact?.phoneNumbers ? contact.phoneNumbers.map(pn => pn?.number) : [],
                }));
            }

        } else {
            console.log("Permission to access contacts was denied.")
        }
    } catch (err) {
        console.error('Error fetching contacts: ', err);
    }
    return[];
}


const synchronizeContacts = async() => {
    const { setContactsUpdated } = useAuth();
    try {
      const phoneContacts = await fetchContacts();

      // Check if phone contacts is null else an empty array
      if (!phoneContacts) return null;

      const transformedPhoneContacts = transformContacts(phoneContacts);
      const cleanedPhoneContacts = removeDuplicateContacts(transformedPhoneContacts);

      // Get stored contacts
      const storedContactsString = await AsyncStorage.getItem(CONTACTS_KEY);
      const storedContacts = storedContactsString ? JSON.parse(storedContactsString) : [];

      // TODO: Clean contacts before saving to the storage, this may increase throughput
      // Hint: Initially stored contacts were an empty array
      // and I should not worry about the format or attributes.
      // Merge and copy to stored contacts if not exist

      // TODO: Before merging get clean contacts from phone contacts,
      const cleanedFormattedPContacts = cleanedPhoneContacts ?? [];

      const validatedPhoneContacts = validateContacts(cleanedFormattedPContacts);

      const synchronizedContacts = await mergeContacts(storedContacts, validatedPhoneContacts);

      const sortedContacts = synchronizedContacts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(sortedContacts));

      setContactsUpdated(true);

      const contactsSize = synchronizedContacts.length;
      Alert.alert("Contacts info", `You have ${contactsSize ?? 0} contacts`);
    } catch (err) {
      console.error('Error synchronizing contacts: ', err);
    }
}


// Function to load contacts to the screen
const loadContacts = async() => {
    try {
      const contactsString = await AsyncStorage.getItem(CONTACTS_KEY);
      if (contactsString) {
        const contacts = JSON.parse(contactsString);
        const validatedContacts = validateContacts(contacts);
        return validatedContacts;
      } else {
        await synchronizeContacts();
      }
    } catch (err) {
      console.error("Error loading contacts | ", err)
    }
};


const saveContacts = async(updatedContacts) => {
    try {
        await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updatedContacts));
        return updatedContacts;
      } catch (err) {
        console.error("Error saving contacts | ", err)
      }
};


const addContact = (contacts, newContact) => {
    if (newContact.trim()) {
        const updatedContacts = [...contacts, newContact.trim()];
        saveContacts(updatedContacts);
    }
};

const deleteContact = (contacts, contactToDelete) => {
    const updatedContacts = contacts.filter(c => c !== contactToDelete);
    saveContacts(updatedContacts);
};

const ContactsUtil = {
    synchronizeContacts,
    transformContacts,
    loadContacts,
    addContact,
    deleteContact,
}
export default ContactsUtil;