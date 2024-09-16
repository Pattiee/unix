import * as SQLite from 'expo-sqlite'
import { Alert } from 'react-native';

const ACCOUNT_DB = 'account.db';
const CHATS_DB = 'chats.db';

export const getCurrentAccount = async () => {
    const accountDB = await SQLite.openDatabaseAsync(ACCOUNT_DB);
    await accountDB.execAsync(`CREATE TABLE IF NOT EXISTS user (id VARCHAR PRIMARY KEY NOT NULL, fname VARCHAR NOT NULL, phone VARCHAR NOT NULL)`);
    return await accountDB.getFirstAsync('SELECT * FROM user');
}

export const logoutLocal = async () => {
    const accountDB = await SQLite.openDatabaseAsync(ACCOUNT_DB);
    const result = await getCurrentAccount();
    await accountDB.runAsync(`DELETE FROM user WHERE id = ${result.id}`);
}

const updateAccount = async (localUserId, user) => {
    const accountDB = await SQLite.openDatabaseAsync(ACCOUNT_DB);
    const fstName = user.firstName;
    await accountDB.runAsync('UPDATE user SET fname = $fname WHERE id = $id', { $fname: fstName, $id: localUserId});
}

export const updateCurrentAccount = async (user) => {
    const result = await getCurrentAccount();
    if (result) {
        if (result.id === user.id && result.phone === user.phone) await updateAccount(result.id, user);
    } else{
        const accountDB = await SQLite.openDatabaseAsync(ACCOUNT_DB);
        const userId = user.id;
        const firstName = user.firstName;
        const phoneNumber = user.phone;
        await accountDB.runAsync('INSERT INTO user (id, fname, phone) VALUES (?, ?, ?)', userId, firstName, phoneNumber);
    }
}
