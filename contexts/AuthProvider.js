import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { router } from 'expo-router';
import SecureStoreService from '../services/secureStore';
import { getCurrentUser } from '../services/user.service';


// SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ msgUpdated, setMsgUpdated ] = useState(false);
    const [ justUploaded, setJustUploaded ] = useState(false);



    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if (res) {
                setIsLoggedIn(true);
                setUser(res.data);
            } else{
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((err) => {
            setIsLoggedIn(false);
            setUser(null);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, msgUpdated, setMsgUpdated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider