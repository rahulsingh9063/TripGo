import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext'; // Import context

export default function SelectDates() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const router = useRouter();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);

      if (selectedStartDate) {
        const start = new Date(selectedStartDate);
        const end = new Date(date);
        const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setTotalDays(difference);
      }
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setTotalDays(0);
    }
  };

  const handleContinue = () => {
    if (!selectedStartDate || !selectedEndDate) return;

    // Update context with selected dates
    setTripData((prevTripData) => ({
      ...prevTripData,
      startDate: selectedStartDate.toISOString(), // Store as ISO string
      endDate: selectedEndDate.toISOString(),
      totalDays,
    }));

    console.log("Saved in Context:", selectedStartDate.toISOString(), selectedEndDate.toISOString(), totalDays);

    router.push('/create-trip/select-budget'); // Navigate to next step
  };

  return (
    <View style={{ padding: 25, paddingTop: 30, backgroundColor: '#fff', height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Travel Dates</Text>

      <View style={{ marginTop: 20 }}>
        <CalendarPicker onDateChange={onDateChange} allowRangeSelection={true} minDate={tomorrow} />
      </View>

      <Text style={{ marginTop: 10, fontSize: 16 }}>
        Selected Start Date: {selectedStartDate ? selectedStartDate.toDateString() : 'None'}
      </Text>
      <Text style={{ marginTop: 5, fontSize: 16 }}>
        Selected End Date: {selectedEndDate ? selectedEndDate.toDateString() : 'None'}
      </Text>

      {selectedStartDate && selectedEndDate && (
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Total Travel Days: {totalDays}</Text>
      )}

      <TouchableOpacity
        onPress={handleContinue}
        style={{
          padding: 15,
          backgroundColor: selectedStartDate && selectedEndDate ? '#000' : '#ccc',
          borderRadius: 15,
          marginTop: 20,
        }}
        disabled={!selectedStartDate || !selectedEndDate}
      >
        <Text style={{ textAlign: 'center', color: '#ffffff' }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
