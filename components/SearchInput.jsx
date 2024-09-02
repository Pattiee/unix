import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import icons from "../constants/icons";
import CustomButton from "../components/CustomButton";
import { router, usePathname } from 'expo-router';


const SearchInput = ({ initialQuery, placeholder }) => {

  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || '');


  useEffect(() => {

  }, []);


  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl flex-row focus:border-secondary items-center space-x-4">
          <TextInput
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={query}
            placeholder={placeholder}
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
            maxLength={1000}
          />

          <TouchableOpacity
            onPress={() => {
              if (!query) {
                return Alert.alert("Missing Query", "Nah!, don't be lazy just type something");
              }
              if (pathname.startsWith('/search')){
                router.setParams({ query });
              } else {
                router.push(`/search/${query}`);
              };
            }}
          >
            <Image source={icons.search_white} className="w-5 h-5" resizeMode='contain'/>
          </TouchableOpacity>
      </View>
  )
}

export default SearchInput