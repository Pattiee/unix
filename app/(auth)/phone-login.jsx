import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneFormFiled from '../../components/form_fields/PhoneFormField';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthProvider';
import { login, phoneLogin } from '../../services/auth.service';
import { getCurrentUser } from '../../services/user.service';
import { Ionicons } from '@expo/vector-icons';



const PhoneLogin = () => {
  const { setUser, setIsLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPicker, setShowPicker ] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryFlag, setCountryFlag] = useState(null);


  useEffect(() => {
    setIsSubmitting(false);
  }, []);



  const handlePhoneNumber = (value) => {
    if (value.trim().includes('`') || value.trim().includes('.')) return;
    setPhoneNumber(value);
  }

  const phoneSubmit = async () => {
    const cCode = countryCode.replace(/ /g, '');
    const p = phoneNumber.replace(/ /g, '');
    const pp = p.replace(/^0+/, '')
    const pNumber = pp.replace(/\D/g, '');
    if (!cCode || !phoneNumber) return Alert.alert("Alert", `${!cCode ? 'Please select country code': 'Please enter your phone number'}`);
    setIsSubmitting(true);

    try {
      const loginData = JSON.stringify({ code: cCode.trim(), phone: pNumber.trim()});

      await phoneLogin(loginData);

      const verificationPhoneNumber = cCode.trim().concat(pNumber.trim());

      setCountryCode('');
      setPhoneNumber('');
      setCountryFlag(null);
      router.push({ pathname: '(auth)/verify', params: { phone: JSON.stringify(verificationPhoneNumber) } });
    } catch (error) {
      Alert.alert("Failed", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <SafeAreaView className="h-full bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl">
      <ScrollView>
        <View className="flex items-center w-full min-h-[83vh] justify-center px-4 my-6">


            <View className="flex justify-center items-center w-[130px] h-[130px] rounded-full">
              <Ionicons name='lock-closed-outline' size={90} color={'#333'}/>
            </View>


            <PhoneFormFiled
              title='Mobile number'
              value={phoneNumber}
              handleChangeText={(val) => handlePhoneNumber(val)}
              otherStyles="mt-7"
              placeholder="e.g 716227064"
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              countryFlag={countryFlag}
              setCountryFlag={setCountryFlag}
            />

              <CustomButton
                title={isSubmitting ? 'Please wait...' : "Next"}
                handlePress={phoneSubmit}
                containerStyles="mt-7 w-full"
                isLoading={isSubmitting}/>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PhoneLogin