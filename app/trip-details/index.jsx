import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

const Index = () => {
  const navigation = useNavigation();
  const { trip: tripParam } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [tripData, setTripData] = useState(null);

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    if (tripParam) {
      try {
        const parsedTrip = JSON.parse(tripParam);
        setTripDetails(parsedTrip);

        const parsedTripData = typeof parsedTrip.tripData === 'string'
          ? JSON.parse(parsedTrip.tripData)
          : parsedTrip.tripData;

        setTripData(parsedTripData);
      } catch (error) {
        console.error("Parsing Error:", error);
      }
    }
  }, [tripParam]);

  if (!tripDetails || !tripData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading your trip...</Text>
      </View>
    );
  }

  const photoRef = tripData?.locationInfo?.photoRef;

  const imageUrl = photoRef && apiKey
    ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
    : null;

 
  let flights = [];
  const rawFlights = tripDetails?.tripPlan?.flights;
  if (Array.isArray(rawFlights)) {
    flights = rawFlights;
  } else if (typeof rawFlights === 'string') {
    try {
      const parsed = JSON.parse(rawFlights);
      flights = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error parsing flights:", e);
    }
  }

  const hotel = tripDetails?.tripPlan?.hotelOptions || [];
  const rawItinerary = tripDetails?.tripPlan?.itinerary || {};
  const traveler = tripData?.traveler;

  const formattedPlan = Object.entries(rawItinerary).map(([key, value], index) => ({
    day: index + 1,
    date: value.date,
    activities: Array.isArray(value.placesToVisit) ? value.placesToVisit: [],

    // activities: Array.isArray(value.places) ? value.places : [],

  }));

  return (
    <ScrollView>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Image source={require('./../../assets/images/login.jpeg')} style={styles.image} />
      )}
 
      <View style={styles.container}>
        <Text style={styles.title}>
          {tripDetails.tripPlan?.travel_plan?.destination || tripData?.locationInfo?.name || 'Trip Destination'}
        </Text> 

        <View style={styles.flexBox}>
          <Text style={styles.smallPara}>
            {moment(tripData?.startDate).format("DD MMM YYYY")}
          </Text>
          <Text style={styles.smallPara}>
            - {moment(tripData?.endDate).format("DD MMM YYYY")}
          </Text>
        </View>

        <Text style={styles.smallPara}>
          {traveler?.icon || "🧍"} {traveler?.title || "Traveler"} ({traveler?.people || "1"})
        </Text>

        <FlightInfo flightData={flights} />
        <HotelList hotelList={hotel} />
        <PlannedTrip details={formattedPlan} />
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 330,
  },
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    height: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 18,
    color: Colors.gray,
  },
  flexBox: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
});
