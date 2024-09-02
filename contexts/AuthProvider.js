import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [justUploaded, setJustUploaded] = useState(false);

    const staticUser = {
        firstName: 'joy',
        email: 'joy@gmail.com',
        password: '1234567890'
    }

    const updateAuthState = () => {
        setIsLoggedIn(true);
        setUser(staticUser);
        setIsLoading(false);
    }

    useEffect(() => {
        updateAuthState();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, justUploaded, setJustUploaded }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider