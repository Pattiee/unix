import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

const useServer = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] =useState(true);


    const fetchData = async () => {
        try {
            const response = await fn();
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

export default useServer;