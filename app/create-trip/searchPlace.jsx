import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { CreateTripContext } from './../../context/CreateTripContext';
import { useRouter } from 'expo-router';

const API_KEY = 'AlzaSylUp67uXWDPezIKXPGMn--P-nGKCOTho7s'; // Replace with your actual API key

export default function SearchPlace() {
   
  const router =useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Fetch place suggestions
  const fetchPlaces = async (input) => {
    if (input.length < 2) return; // Avoid unnecessary API calls

    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}`
      );

      if (response.data && response.data.predictions) {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  // Fetch place details
  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`
      );

      return response.data?.result; // Extract place details
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View style={{ padding: 20 }}>
      {/* Search Input */}
      <TextInput
        placeholder="Search location..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          fetchPlaces(text);
        }}
        style={{
          height: 50,
          borderColor: '#10A881',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius:10
        }}
      />

      {/* Suggestions List */}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              const details = await fetchPlaceDetails(item.place_id); // Fetch details

              if (details) {
                setQuery(item.description); // Set selected place name
                setSuggestions([]); // Clear suggestions

                setTripData({
                  locationInfo: {
                    name: item.description,
                    coordinates: details.geometry?.location,
                    photo_ref: details.photos?.[0]?.photo_reference,
                    url: details.url,
                  },
                });
                router.push('/create-trip/select-traveller')
              }
            }}
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
