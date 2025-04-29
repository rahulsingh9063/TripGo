import { View } from 'react-native';
import Login from './../components/Login';
import { auth } from './../configs/FirebaseConfig';

import { Redirect, useRouter } from 'expo-router';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { initializeAuth } from 'firebase/auth';


export default function Index(){

  
  const user = auth.currentUser;

  return(
    <View style={{
      flex:1
    }}>

      {user? <Redirect href={'/mytrip'}/>: <Login/> }
    </View>
  )
}
