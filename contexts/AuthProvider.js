import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { router } from 'expo-router';
import SecureStoreService from '../services/secureStore';
import { getCurrentUser } from '../services/user.service';
import { updateCurrentAccount, getCurrentAccount } from '../db'


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ msgUpdated, setMsgUpdated ] = useState(false);
    const [ justUploaded, setJustUploaded ] = useState(false);
    const [ contactsUpdated, setContactsUpdated ] = useState(false);


    const localAccountUpdate = async () => {
        getCurrentAccount().then((result) => {
            console.error("LOCAL | ", result);
            if (result) {
                const usr = {
                    id: result.id,
                    firstName: result.fname,
                    phone: result.phone,
                };
                setUser(usr);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        }).catch((er) => {

        }).finally(() => {
            setIsLoading(false);
        });
    }



    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                console.error("SERVER RES | ", res);
                setIsLoggedIn(true);
                setUser(res);
                updateCurrentAccount(res);
            }
        }).catch((err) => {
        }).finally(async () => {
            if (!user) {
                localAccountUpdate();
            }
        });
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, msgUpdated, setMsgUpdated, contactsUpdated, setContactsUpdated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider