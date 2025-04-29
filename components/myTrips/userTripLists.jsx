import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Colors } from './../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

const UserTripList = ({ userTrips }) => {
  const router = useRouter();

  if (!userTrips || userTrips.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.paragraph}>No trips available.</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      {userTrips.map((trip, index) => {
        const rawTripData = trip?.tripData;
        const tripData = typeof rawTripData === 'string'
          ? JSON.parse(rawTripData)
          : rawTripData || {};

        const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
        const photoRef = tripData?.locationInfo?.photoRef;
        const imageUrl = photoRef && apiKey
          ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
          : null;

        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Image
              source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/login.jpeg')}
              style={styles.image}
            />

            <View style={{ marginTop: 10 }}>
              <Text style={styles.paragraph}>
                {trip?.tripPlan?.tripDetails?.location|| 'Unknown Destination'}
              </Text>

              <View style={styles.flexContainer}>
                <Text style={styles.smallPara}>
                  {tripData?.startDate
                    ? moment(tripData.startDate).format('DD MMM YYYY')
                    : 'No date'}
                </Text>
                <Text style={styles.smallPara}>
                  🚌 {tripData?.traveler?.title || 'Traveler'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push({
                    pathname: '/trip-details',
                    params: { trip: JSON.stringify(trip) },
                  })
                }
              >
                <Text style={styles.buttonText}>See Your Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 15,
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 17,
    color: Colors.gray,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Outfit-Medium',
    fontSize: 15,
  },
  centered: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default UserTripList;
