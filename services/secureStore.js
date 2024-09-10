import * as SecureStore from 'expo-secure-store'


const save = async (key, value) => {
    // const jsonKey = JSON.stringify(key);
    const jsonValue = JSON.stringify(value);

    await SecureStore.setItemAsync(key, jsonValue);
}


const getValueFor = async (key) => {
    // const jsonKey = JSON.stringify(key);
    let result = SecureStore.getItemAsync(key);

    if (result) return result;
    return null;
}

const SecureStoreService = { save, getValueFor }
export default SecureStoreService