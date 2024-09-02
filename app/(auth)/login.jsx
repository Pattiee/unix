import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants/images";
import FormFiled from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthProvider';
import { login, getCurrentUser } from '../../services/auth.service'

const Login = () => {
  const { user, setUser, setIsLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });


  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const submit = async () => {
    if (!form.email || !form.password || form.password.trim() === "" || form.email.trim() === "") return Alert.alert("Error", "Please fill in all the fields");
    if (form.email.trim().includes('`') || form.password.trim().includes('`')) return Alert.alert("Error", "Invalid input");

    setIsSubmitting(true);

    try {
      const loginData = JSON.stringify(form.email.trim(), form.password.trim());
      await login(loginData);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "Welcome back");
      router.replace("/home");

    } catch (error) {
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
    return;
  }


  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex items-center w-full min-h-[83vh] justify-center px-4 my-6">

            <Image
              source={images.logo2}
              resizeMode='contain'
              className="w-[130px] h-[130px] rounded-full m-0 p-2"
            />

            <Text className="text-3xl text-black-100
             font-bold text-center mt-10">Login</Text>

            <FormFiled
              title='Email'
              value={form.email}
              handleChangeText={(val) => setForm({ ...form, email: val })}
              otherStyles="mt-7"
              keyboardType="email-address"
              // placeholder="Email address "
              auto_capitalize={"none"}
            />

            <FormFiled
              title="Password"
              value={form.password}
              handleChangeText={(value) => setForm({ ...form, password: value })}
              otherStyles="mt-7"
              // placeholder="Password "
            />

            <CustomButton
              title={"Sign in"}
              handlePress={submit}
              containerStyles="mt-7 w-full"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-500 font-pregular">
                Don't have an account?
              </Text>

              <Link href="/register" className='text-lg font-psemibold text-primary'>Sign up</Link>

            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login