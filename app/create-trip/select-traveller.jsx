import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectTravelesList } from './../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedTraveler) {
      setTripData((prevData) => ({
        ...prevData,
        traveler: selectedTraveler,
      }));
    }
  }, [selectedTraveler, setTripData]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  // Determine if the button should be active
  const isButtonDisabled = !selectedTraveler;
  const buttonColor = isButtonDisabled ? '#ccc' : '#000';

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 30,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 25,
        }}
      >
        Who's Travelling
      </Text>

      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 15,
          marginTop: 10,
        }}
      >
        Choose Your Travelers
      </Text>

      <FlatList
        data={SelectTravelesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTraveler(item)}
            style={{
              marginVertical: 8,
            }}
          >
            <OptionCard option={item} selectedOption={selectedTraveler} />
          </TouchableOpacity>
        )}
      />

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => {
          if (!isButtonDisabled) router.push('/create-trip/SelectDates');
        }}
        style={{
          padding: 15,
          backgroundColor: buttonColor, // ✅ Dynamic color based on selection
          borderRadius: 15,
          marginTop: 20,
        }}
        disabled={isButtonDisabled} // ✅ Disable button when no selection
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
 