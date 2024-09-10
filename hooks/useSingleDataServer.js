import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

const useSingleDataServer = (fn) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] =useState(true);


    const fetchData = async () => {
        try {
            const response = await fn();
            console.error("RESPONSE | ", response);
            setData(response);
        } catch (error) {
            Alert.alert("Error", error?.message)
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}

export default useSingleDataServer;