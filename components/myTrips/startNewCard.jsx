import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import { useRouter } from 'expo-router';


export default function StartNewCard() {

  const router = useRouter();

  return (
    <View style={{
        padding:20,
        marginTop:45,
        display:'flex',
        alignItems:'center',
        gap:25
    }}>
      

      <Ionicons name="location-sharp" size={34} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium',
      }}>
        No Trips Planned Yet
      </Text>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        textAlign:'center',
        color:"#4b7556"
      }}>
        Looks like its time to plan a new travel experience ! Gets Started
      </Text>

      <TouchableOpacity
      onPress={()=>router.push('/create-trip/searchPlace')}
        style={{
            padding:15,
            borderRadius:15,
            paddingHorizontal:30,
            backgroundColor:'#000'
        }}
      >
        <Text style={{
            color:'#fff',
            fontFamily:'outfit-medium',
            fontSize:17
        }}>
            Start a new trip
        </Text>
      </TouchableOpacity>

    </View>
  )
}