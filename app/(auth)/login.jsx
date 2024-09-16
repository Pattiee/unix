import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants/images";
import FormFiled from '../../components/form_fields/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthProvider';
import { login } from '../../services/auth.service'
import axios from 'axios';
import SecureStoreService from '../../services/secureStore'
import * as SecureStore from 'expo-secure-store'
import { getCurrentUser } from '../../services/user.service';


const Login = () => {
  const { setUser, setIsLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });


  const goToRegister = () => {
    setForm({ ...form, email: '', password: ''});
    return router.push('(auth)/register');
  }


  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const submit = async () => {
    if (!form.email || !form.password || form.password.trim() === "" || form.email.trim() === "") return Alert.alert("Alert", "Please fill in all the fields");
    if (form.email.trim().includes('`') || form.password.trim().includes('`')) return Alert.alert("Alert", "Invalid input");

    setIsSubmitting(true);

    try {
      const loginData = JSON.stringify({ email: form.email.trim(), password: form.password.trim()});

      await login(loginData);

      const result = await getCurrentUser();
      setUser(result.data);
      setIsLoggedIn(true)
      router.replace("/home");

    } catch (error) {
      console.log(error)
      Alert.alert("Failed", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <SafeAreaView className="h-full bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl">
      <ScrollView>
        <View className="flex items-center w-full min-h-[83vh] justify-center px-4 my-6">

            <Image
              source={images.logo2}
              resizeMode='contain'
              className="w-[130px] h-[130px] rounded-full m-0 p-2"
            />

            <Text className="text-3xl text-slate-800 dark:text-white font-bold text-center mt-10">Login</Text>

            <FormFiled
              title='Email'
              value={form.email}
              handleChangeText={(val) => setForm({ ...form, email: val })}
              otherStyles="mt-7"
              keyboardType="email-address"
              // placeholder="Email address "
              // auto_capitalize={'none'}
            />

            <FormFiled
              title="Password"
              value={form.password}
              handleChangeText={(value) => setForm({ ...form, password: value })}
              otherStyles="mt-7"
              // placeholder="Password "
            />


                <CustomButton
                  title={isSubmitting ? 'Please wait...' : "Sign in"}
                  handlePress={submit}
                  containerStyles="mt-7 w-full"
                  isLoading={isSubmitting}/>

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-slate-500 font-pregular">
                Don't have an account?
              </Text>

              <Text disabled={isSubmitting} onPress={() => goToRegister()} className='text-lg font-psemibold text-slate-500 dark:text-white'>Sign up</Text>

            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login