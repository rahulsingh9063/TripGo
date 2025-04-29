import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { SelectBudgetOptions } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';

export default function SelectBudget() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedOption, setSelectedOption] = useState(tripData?.budget || null);
  const router = useRouter();

  useEffect(() => {
    if (selectedOption) {
      setTripData((prevTripData) => ({
        ...prevTripData,
        budget: selectedOption.title, // ✅ Corrected this line
      }));
    }
  }, [selectedOption]);

  const isButtonDisabled = !selectedOption;
  const buttonColor = isButtonDisabled ? '#ccc' : '#000';

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginBottom: 10 }}>
        Select Budget 💰
      </Text>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontFamily: 'outfit-bold', marginBottom: 10 }}>
          Choose a budget that fits your trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
          style={{ width: '100%' }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => {
          if (!isButtonDisabled) router.push('/create-trip/review-trip');
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
