import { StyleSheet, Text, View, ActivityIndicator, FlatList ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import StartNewTripCard from '../../components/myTrips/startNewCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from './../../components/myTrips/userTripLists';
import { useRouter } from 'expo-router';


const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const userEmail = user?.email;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getMyTrip();
    }
  }, [user]);

  const getMyTrip = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        let parsedTripData = {};
        try {
          parsedTripData =
            typeof data.tripData === 'string' ? JSON.parse(data.tripData) : data.tripData;
        } catch (err) {
          console.error('Failed to parse tripData', err.message);
        }

        return { id: doc.id, ...data, tripData: parsedTripData };
      });

      setUserTrips(trips);
    } catch (err) {
      console.error('🔥 getMyTrip Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => <UserTripList userTrips={[item]} />;

  return (
    <View style={styles.mainView}>
      <View style={styles.flexRowView}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity onPress={() => {router.push('/create-trip/searchPlace') }}>
          <Ionicons name="add-circle-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
      {!loading && userTrips.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <FlatList
          data={userTrips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MyTrip;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 40,
    padding: 25,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    marginTop: 30,
  },
  flexRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
