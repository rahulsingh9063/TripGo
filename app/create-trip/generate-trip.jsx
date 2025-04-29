import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from './../../context/CreateTripContext'; 
import { AI_PROMPT } from '../../constants/Options';
import { sendMessage } from '../../configs/AiModel'; // Updated import
import { useRouter } from 'expo-router';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../configs/FirebaseConfig';

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData && !loading) {
      GenerateAiTrip();
    }
  }, [tripData]);

  const GenerateAiTrip = async () => {
    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name)
        .replace('{totalDays}', tripData?.totalDays)
        .replace('{totalNight}', tripData?.totalDays - 1)
        .replace('{traveler}', tripData?.traveler?.title)
        .replace('{budget}', tripData?.budget);

      console.log("AI Prompt:", FINAL_PROMPT);

      const responseText = await sendMessage(FINAL_PROMPT);
      console.log("AI Response:", responseText);

      const tripResp = JSON.parse(responseText);

      const collectionName = "UserTrips";
      // Create a new document in the specified collection
      const docRef = await addDoc(collection(db, collectionName), {
        userEmail: user?.email,
        tripPlan: tripResp,
        tripData:JSON.stringify(tripData),
        collectionName: collectionName,
        documentId: "", // Placeholder that will be updated with the actual document ID
      });

      // Update the same document with its own document ID
      await setDoc(docRef, { documentId: docRef.id }, { merge: true });

      console.log("New trip ID:", docRef.id);
      router.push('(tabs)/mytrip');
    } catch (error) {
      console.error("Error generating AI trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 30, backgroundColor: '#fff', height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>
        Please Wait ...
      </Text>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: 20 }}>
        Your dream trip is on the way
      </Text>
      <Image
        source={require('../../assets/images/family-fun.gif')}
        style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 30 }}
      />
    </View>
  );
}
