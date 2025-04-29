import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Colors } from './../../constants/Colors';

const FlightInfo = ({ flightData }) => {
  // ✅ Debug log outside JSX
  console.log("🛩️ Is flightData an array?", Array.isArray(flightData));
  console.log("🛩️ flightData:", flightData);

  if (!flightData || flightData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>✈️ Flights</Text>
        <Text style={styles.para}>No flight information available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️ Flights</Text>

      {flightData.map((flight, index) => (
        <View key={index} style={styles.flightContainer}>
          <Text style={styles.para}>🛫 Airline: {flight.airline || 'Unknown'}</Text>
          <Text style={styles.para}>💸 Price: {flight.price || 'N/A'}</Text>
          <Text style={styles.para}>📍 Departure: {flight.departureCity}</Text>
          <Text style={styles.para}>📍 Arrival: {flight.arrivalCity}</Text>
          <Text style={styles.para}>
            🕰️ Departure Time: {new Date(flight.departureDate).toLocaleString()}
          </Text>
          <Text style={styles.para}>
            🕰️ Arrival Time: {new Date(flight.arrivalDate).toLocaleString()}
          </Text>
          {flight.bookingUrl && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(flight.bookingUrl)}
            >
              <Text style={styles.buttonTxT}>Book Here</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default FlightInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: Colors.lightGray,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  para: {
    fontFamily: 'Outfit',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  buttonTxT: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
  },
  flightContainer: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
});
