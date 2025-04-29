import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig'; // update path if needed
import { Colors } from '../../constants/Colors';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn('No user data found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace('Login'); // or navigation.navigate('Login')
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.para}>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={userData.profileImage ? { uri: userData.profileImage } : require('../../assets/images/login.jpeg')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{userData.name || user.displayName}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    color: Colors.dark,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Outfit',
    color: '#666',
    marginBottom: 25,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: Colors.white,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: Colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  para: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Outfit',
  },
});
