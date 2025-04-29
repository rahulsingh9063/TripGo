import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { auth } from '../../../configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
      navigation.setOptions({
          headerShown: false
      });
  }, [navigation]);

  // Handle account creation
  const onCreateAccount = async () => {
      if (!email || !password || !fullName) {
          ToastAndroid.show('Please fill all the details', ToastAndroid.LONG);
          return;
      }

      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log('User registered:', user);

          // Show success toast
          ToastAndroid.show('Account created successfully! Redirecting...', ToastAndroid.LONG);

          // Redirect to Sign In page
          setTimeout(() => {
              router.replace('/mytrip');
          }, 2000); // Delay redirection for better UX

      } catch (error) {
          console.error('Sign-up error:', error.message);

          switch (error.code) {
              case 'auth/email-already-in-use':
                  ToastAndroid.show('Email is already in use', ToastAndroid.LONG);
                  break;
              case 'auth/invalid-email':
                  ToastAndroid.show('Invalid email format', ToastAndroid.LONG);
                  break;
              case 'auth/weak-password':
                  ToastAndroid.show('Password must be at least 6 characters', ToastAndroid.LONG);
                  break;
              default:
                  ToastAndroid.show('Account creation failed. Try again.', ToastAndroid.LONG);
          }
      }
  };

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Create New Account</Text>

          {/* Full Name */}
          <View style={styles.inputContainer}>
              <Text>Full Name</Text>
              <TextInput 
                  style={styles.input} 
                  placeholder='Enter Full Name' 
                  onChangeText={setFullName}
                  value={fullName}
              />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
              <Text>Email</Text>
              <TextInput 
                  style={styles.input} 
                  placeholder='Enter Email'
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
              />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
              <Text>Password</Text>
              <TextInput
                  secureTextEntry={true}
                  style={styles.input} 
                  placeholder='Enter Password' 
                  onChangeText={setPassword}
                  value={password}
              />
          </View>

          {/* Create Account Button */}
          <TouchableOpacity onPress={onCreateAccount} style={styles.createAccountButton}>
              <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Already have an account? */}
          <View>
              <Text style={styles.orText}>Already have an account?</Text>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity onPress={() => router.replace('/auth/sign-in')} style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
      </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
      padding: 25,
      paddingTop: 50
  },
  title: {
      fontFamily: 'outfit-bold',
      fontSize: 27
  },
  inputContainer: {
      marginTop: 20
  },
  input: {
      padding: 12,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: '#7d7d7d',
      marginTop: 5
  },
  createAccountButton: {
      padding: 15,
      backgroundColor: '#000',
      borderRadius: 15,
      marginTop: 50
  },
  buttonText: {
      color: '#fff',
      textAlign: 'center'
  },
  orText: {
      color: '#000',
      textAlign: 'center',
      marginTop: 20
  },
  signInButton: {
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 15,
      marginTop: 20,
      borderWidth: 1
  },
  signInText: {
      color: '#000',
      textAlign: 'center'
  }
});

