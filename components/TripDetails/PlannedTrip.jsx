import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Linking } from 'react-native';


const openInMaps = (placeName) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
  Linking.openURL(url);
};


// Display individual places
const PlannedTrip = ({ details }) => {
  if (!details || !Array.isArray(details)) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏕️ Plan Details</Text>

      {details.map((dayData, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>
            Day {dayData.day} - {dayData.date}
          </Text>

          {dayData.activities.map((place, idx) => (
            <View key={idx} style={styles.placeCard}>
              <Image
                source={
                   require('./../../assets/images/place.jpg')
                }
                style={styles.image}
              />
              <View style={styles.placeInfo}>
                <Text style={styles.placeTitle}>📍 {place.name}</Text>
                <Text style={styles.placeDetails}>📝 {place.description}</Text>
                <Text style={styles.placeInfoText}>🌤️ Best Time to Visit: {place.bestTimeToVisit}</Text>
                <Text style={styles.placeInfoText}>🕐 Time to Travel: {place.timeTravel}</Text>
                <Text style={styles.placeInfoText}>💸 Ticket Price: {place.ticketPrice}</Text>


                

              </View>

              <TouchableOpacity style={{
                padding:5,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                alignItems: 'center',
              }} onPress={() => openInMaps(place.name)}>
              <Feather name="navigation" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default PlannedTrip;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
  },
  dayTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  placeCard: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  placeInfo: {
    marginTop: 10,
  },
  placeTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    marginBottom: 5,
  },
  placeDetails: {
    fontFamily: 'Outfit-Light',
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  placeInfoText: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});
