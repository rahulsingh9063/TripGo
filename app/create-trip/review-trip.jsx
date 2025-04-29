import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {
  const { tripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    console.log("Review Trip Data:", tripData); // Debugging log
  }, [tripData]);

  // Ensure valid dates before formatting
  const formattedStartDate = tripData?.startDate
    ? moment(tripData.startDate).format('MMMM Do')
    : 'Not selected';
  const formattedEndDate = tripData?.endDate
    ? moment(tripData.endDate).format('MMMM Do')
    : 'Not selected';
  const totalDays = tripData?.totalDays || 'N/A';

  return (
    <View style={{ padding: 20, paddingTop: 30, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 28, marginBottom: 20, textAlign: 'center' }}>
        Preview Your Trip  ✈️
      </Text>

      {/* Destination Info */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🗼</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Destination</Text>
          <Text style={styles.cardText}>{tripData?.locationInfo?.name || 'Not selected'}</Text>
        </View>
      </View>

      {/* Travel Date Info */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📅</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Travel Dates</Text>
          <Text style={styles.cardText}>
            {formattedStartDate} - {formattedEndDate} ({totalDays} days)
          </Text>
        </View>
      </View>

      {/* Traveler Info */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🧳</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Traveler</Text>
          <Text style={styles.cardText}>{tripData?.traveler?.title || 'Not specified'}</Text>
        </View>
      </View>

      {/* Budget Info */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💰</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Budget</Text>
          <Text style={styles.cardText}>
            {tripData?.budget ? tripData.budget : 'Not specified'}
          </Text>
        </View>
      </View>

       {/* Continue Button */}
         <TouchableOpacity
          
          onPress={() => router.push('/create-trip/generate-trip')}

         style={{
            padding: 15,
            backgroundColor: '#007BFF',
            borderRadius: 15,
            marginTop: 20,
          }}>

            <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'outfit-medium' }}>
              Build My Trip
            </Text>
         
         </TouchableOpacity>
    </View>
  );
}

const styles = {
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 26,
  },
  textContainer: {
    flex: 1, // Allows the text to take up remaining space
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    flexShrink: 1, // Prevents text overflow
    maxWidth: '85%', // Ensures text does not exceed card width
  },
};
