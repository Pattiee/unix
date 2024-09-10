import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';


const FormField = ({ title, value, auto_capitalize, inputMod, mxLength, keyboard_type, placeholder, handleChangeText, otherStyles, keyboardType, ...props }) => {

  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    setShowPassword(false);
  }, []);


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray font-pmedium">{title}</Text>
      <View className="border-2 w-full h-16 px-4 rounded-2xl flex-row focus:border-primary items-center">
          <TextInput
            className="flex-1 text-lg font-pregular"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword && showPassword == false}
            maxLength={mxLength}
          />

          {
            title === 'Password' && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={!showPassword ? 'eye-outline' : 'eye-off-outline'} size={24}/>
              </TouchableOpacity>
            )
          }
      </View>
    </View>
  )
}

export default FormField