import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false
    }}>
        <Tabs.Screen name="mytrip"
        
        options={{
          tabBarLabel:'My Trip',
          tabBarIcon:({color})=><Entypo name="location-pin" size={24} color="black" />
        }}
        
        />
        <Tabs.Screen name="discover"
        
        options={{
          tabBarLabel:'Discover',
          tabBarIcon:({color})=><Ionicons name="globe-sharp" size={24} color="black" />
        }}

        />
        <Tabs.Screen name="profile"
        
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person-circle-outline" size={24} color="black" />
        }}

        />
    </Tabs>
  )
}