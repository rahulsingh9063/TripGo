import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useRouter } from 'expo-router'

export default function Login() {

    const router = useRouter();

  return (
    <View>
      <Image source={require('./../assets/images/login.jpeg')}
      
      style={{
        width:'100%',
        height:450,
        marginTop:-40
      }}
      />

      <View style={styles.container}>
        <Text style={{
            marginTop:-15,
            fontSize:28, 
            fontFamily:'outfit-bold',
            textAlign:'center'
        }}>TripGo</Text>

        <Text style={{
            fontFamily:'outfit',
            fontSize:16,
            textAlign:'center',
            color:'#7d7d7d',
        }}>Discover your next adventure effortlessly. Personalized itineraries at your finngertips. Travel smarter with AI-driven insights.</Text>

        <TouchableOpacity style={styles.button}
        
         onPress={()=>router.push('auth/sign-in')}
        >
            <Text style={{color:'#fff',textAlign:'center', fontFamily:'outfit', fontSize:17}}>Get Started</Text>
        </TouchableOpacity>
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#fff',
        marginTop:-20,
        height:'100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:25
    },
    button:{
        padding:5,
        margin:10,
        backgroundColor:'#000',
        borderRadius:199,
        marginTop:'18%'
    }
    
})