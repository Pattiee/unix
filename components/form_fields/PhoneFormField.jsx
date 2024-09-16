import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CountryPicker } from 'react-native-country-codes-picker';
import { SafeAreaView } from 'react-native-safe-area-context';



const PhoneFormField = ({ title, countryCode, countryFlag, setCountryFlag, setCountryCode, value, auto_capitalize, inputMod, mxLength, placeholder, handleChangeText, otherStyles, ...props }) => {

  const [showPicker, setShowPicker] = useState(false);




  useEffect(() => {
    if (showPicker) {
      setShowPicker(false);
    }
  }, []);


  const countryPListHeader = () => (
    <View>
      <Text className="text-3xl">Hello user</Text>
    </View>
  )


  return (
    <View className={`flex justify-center items-center space-y-2 py-2 px-2 w-full ${otherStyles}`}>
      <Text className="text-base text-slate-800 dark:text-white font-pmedium">{title}</Text>

      <View className="border-2 w-full h-16 rounded-2xl flex-row focus:border-primary items-center">
          <View className="w-1/5 bg-slate-300 rounded-l-2xl">
            <TouchableOpacity className="flex rounded-l-2xl justify-center items-center w-full h-full" onPress={() => setShowPicker(true)}>
              <Text className="text-xl text-slate-800">{countryFlag}</Text>
            </TouchableOpacity>

            <CountryPicker
                show={showPicker}
                onBackdropPress={() => setShowPicker(false)}
                pickerButtonOnPress={(item) => {
                  setCountryCode(item.dial_code);
                  setCountryFlag(item.flag);
                  setShowPicker(false);
                }}
                lang='en'
                ListHeaderComponent={() => countryPListHeader()}
            />
          </View>

          <View className="w-4/5">
            <TextInput
              className="text-slate-800 px-2 rounded-r-2xl h-full dark:text-white text-xl font-pregular"
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#7b7b8b"
              onChangeText={handleChangeText}
              maxLength={15}
              keyboardType='phone-pad'
            />
          </View>
      </View>
    </View>
  )
}

export default PhoneFormField