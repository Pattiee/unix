import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants/images";
import FormFiled from '../../components/form_fields/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthProvider';
import { register } from '../../services/auth.service';



const Register = () => {
  const { setUser, setIsLoggedIn } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  useEffect(() => {

    setIsSubmitting(false);
    setForm({ ...form, firstName: '' });
    setForm({ ...form, email: '' });
    setForm({ ...form, password: '' });
  }, []);

  const submit = async () => {
    if (!form.firstName || !form.email || !form.password) return Alert.alert("Alert", "Please fill in all the fields");
    if (form.email.includes('`') || form.password.includes('`') || form.firstName.includes('`')) return Alert.alert("Alert", "Invalid input");

    setIsSubmitting(true);

    try {
      const data = JSON.stringify({ firstName: form.firstName, email: form.email, password: form.password })
      const result = await register(data);
      setUser(result);
      setIsLoggedIn(true);

      // router.replace("/app/home");
      router.replace("/login");

      // TODO: should route to login
      // router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
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

            <Text className="text-2xl
            text-semibold mt-10 font-psemibold">Create a new account</Text>


            <FormFiled
              title='Mobile number'
              value={form.firstName}
              handleChangeText={(val) => setForm({ ...form, firstName: val })}
              otherStyles="mt-7"
              // placeholder={"First name"}
              mxLength={50}
            />

            {/* <FormFiled
              title='ID number'
              value={form.idNumber}
              handleChangeText={(val) => setForm({ ...form, idNumber: val })}
              otherStyles="mt-10"
              placeholder={"ID or Passport number"}
              mxLength={15}
            /> */}

            <FormFiled
              title='Email'
              value={form.email}
              handleChangeText={(val) => setForm({ ...form, email: val })}
              otherStyles="mt-7"
              keyboardType="email-address"
              // placeholder={"Email address"}
              mxLength={50}
            />

            <FormFiled
              title='Password'
              value={form.password}
              handleChangeText={(value) => setForm({ ...form, password: value })}
              otherStyles="mt-7"
              keyboardType="password"
              // placeholder="Create new password"
            />

            <CustomButton
              title={isSubmitting ? 'Please wait...' : "Sign up"}
              handlePress={submit}
              containerStyles="mt-7 w-full"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-slate-500 font-pregular">
                Already have an account?
              </Text>

              <Link disabled={isSubmitting} href="/login" className='text-lg font-psemibold text-slate-500 dark:text-white'>Sign in</Link>

            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register