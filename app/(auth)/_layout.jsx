import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      <Stack>

        <Stack.Screen
          name='login'
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='register'
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor='#161616' style='light'/>
    </>
  )
}

export default AuthLayout