import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option, selectedOption}) {
  return (


    
    <View style={[{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#DAE0E2',
        borderRadius:15
    },selectedOption?.id==option?.id &&{borderWidth:2}]}>

        <View>
            <Text
            
            style={{
                fontSize:20,
                fontFamily:'outfit-bold'
            }}>{option?.title}</Text>

            <Text style={{
                fontSize:17,
                fontFamily:'outfit',
                color:'#10A881'
            }}>
                {option?.desc}
            </Text>

        </View>

            <Text style={{
                fontSize:30,
            }}>{option?.icon}</Text>
      
    </View>
  )
}