import { 
    View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
    const router = useRouter();
    const navigation = useNavigation();

    // Initialize email and password with empty strings
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [navigation]); // Added dependency array to avoid lint warnings

    const onSignIn = async () => {
        if (!email || !password) {
            ToastAndroid.show('Please enter your email and password', ToastAndroid.LONG);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in:', user);

            ToastAndroid.show('Login successful!', ToastAndroid.LONG);
            router.replace('/mytrip'); // Navigate to MyTrip page

        } catch (error) {
            console.error('Sign-in error:', error.message);
            
            // Handling specific Firebase authentication errors
            switch (error.code) {
                case 'auth/invalid-credential':
                    ToastAndroid.show('Invalid email or password', ToastAndroid.LONG);
                    break;
                case 'auth/user-not-found':
                    ToastAndroid.show('User not found. Please sign up.', ToastAndroid.LONG);
                    break;
                case 'auth/wrong-password':
                    ToastAndroid.show('Incorrect password', ToastAndroid.LONG);
                    break;
                case 'auth/too-many-requests':
                    ToastAndroid.show('Too many failed attempts. Try again later.', ToastAndroid.LONG);
                    break;
                default:
                    ToastAndroid.show('Login failed. Please try again.', ToastAndroid.LONG);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's Sign You In</Text>
            <Text style={styles.subtitle}>Welcome Back</Text>

            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput 
                    onChangeText={setEmail} 
                    value={email}
                    style={styles.input} 
                    placeholder='Enter Email'
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    style={styles.input} 
                    placeholder='Enter Password'
                />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* OR New to TripGo */}
            <View>
                <Text style={styles.orText}>or New to TripGo</Text>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity onPress={() => router.replace('/auth/sign-up')} style={styles.createAccountButton}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        padding: 25,
        marginTop: 50
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 30
    },
    subtitle: {
        fontFamily: 'outfit',
        fontSize: 30,
        color: '#7d7d7d',
        marginTop: 20
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
    signInButton: {
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
    createAccountButton: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1
    },
    createAccountText: {
        color: '#000',
        textAlign: 'center'
    }
});

