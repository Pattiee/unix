import { MMKV } from "react-native-mmkv";


const storage = new MMKV();


export const saveContactsToMMKV = async (contacts) => {
    const jsonContacts = JSON.stringify(contacts);
    storage.set("contacts", jsonContacts);
}

export const loadContactsFromMMKV = async() => {
    const jsonContacts = storage.getString("contacts");
    if (jsonContacts) {
        const existingContacts = JSON.parse(jsonContacts);
        return existingContacts;
    }
    return [];
}