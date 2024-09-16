import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { verifyPhoneOTP } from '../../services/auth.service';



const Verify = () => {
    // Initialize a fixed-sized array of 5 elements for storing OTP
  const [otpArray, setOtpArray] = useState(Array(5).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpInputRefs = useRef([]);
  const { phone } = useLocalSearchParams();


  const otpElement = (digit, index) => (
    <View key={index} className="flex items-center flex-col h-full bg-slate-500 w-[50px] justify-center rounded-lg">
        <TextInput key={index} ref={(el) => (otpInputRefs.current[index] = el)} value={digit} onKeyPress={(event) => handleKeyPress(event, index)} numberOfLines={1} keyboardType='numeric' maxLength={1} onChangeText={(val) => handleInputChange(val, index)} className="flex text-3xl text-white items-center focus:border-2 focus:border-slate-800 justify-center h-full w-full rounded-lg"/>
    </View>
  );


  const handleInputChange = (value, index) => {
    if (/^\d*$/.test(value)) { // only allow numeric values
        const newArray = [...otpArray];
        newArray[index] = value; // Update specific index in OTP Array
        setOtpArray(newArray);

        // Move focus to the next input when a value is entered
        if(value && index < otpInputRefs.current.length - 1){
            otpInputRefs.current[index + 1].focus();
        }
    }
  }


  const handleKeyPress = (event, index) => {
    // Handle backspace to move to previous input
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otpArray[index] === '') {
        otpInputRefs.current[index - 1].focus();
        otpInputRefs.current[index - 1].value === '';
    }
  };

  // 
  const handleSubmitVerifyOTP = async (oneTimePassword) => {
    setIsSubmitting(true);

    const pn = JSON.parse(phone);
    const verificationData = JSON.stringify({ phone: pn, otp: oneTimePassword });
    await verifyPhoneOTP(verificationData).then((res) => {
      Alert.alert("SUCCESS", `${res}`);
    }).catch((err) => {
      Alert.alert("Failed", err?.message);
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  useEffect(() => {
    if (otpArray.every((d) => d !== '')) {
        handleSubmitVerifyOTP(otpArray.join(''));
    }
  }, [otpArray]);


  return (
    <SafeAreaView className="h-full bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl">
        <View className="flex items-center py-10 h-full w-full min-h-[83vh] px-4 my-6">

            <View className="flex flex-row justify-around w-full rounded-lg bg-slate-300 h-[70px] py-[10px]">
                { otpArray.map((digit, index) => otpElement(digit, index)) }
            </View>

            <View className="flex flex-col justify-center items-center">
                <Text className="my-1">Resend OTP in 43 seconds</Text>

                <TouchableOpacity className="flex justify-center items-center rounded-lg my-4 bg-primary px-4 py-2 h-10">
                    <Text className="text-white text-lg">Resend</Text>
                </TouchableOpacity>
            </View>

        </View>
    </SafeAreaView>
  )
}

export default Verify