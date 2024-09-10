import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'



const TabIcon = ({ icon, color, name, focused }) => {
    return(
      <View className="items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color}}>{name}</Text>
      </View>
    )
  }



const TabsLayout = () => {
  return (
    <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#333",
            tabBarInactiveTintColor: "#999",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '',
              borderTopWidth: 1,
              // borderTopColor: "#d50e0e",
              height: 70,
            },
          }}>

            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.home} color={color} name={"Home"} focused={focused}/>
                    )
                }}
            />

            <Tabs.Screen
                name='chats'
                options={{
                    title: "Chats",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.favicon} color={color} name={"Chats"} focused={focused}/>
                    )
                }}
            />

            <Tabs.Screen
                name='polls'
                options={{
                    title: "Polls",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.bookmark} color={color} name={"Polls"} focused={focused}/>
                    )
                }}
            />


            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.profile} color={color} name={"Profile"} focused={focused}/>
                    )
                }}
            />

        </Tabs>
    </>
  )
}

export default TabsLayout;