import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';

const HotelList = ({ hotelList }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨 Hotel Recommendations</Text>
      <FlatList 
        style={styles.hotelItem}
        data={hotelList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.hotelCard}>
            {/* Dynamic Image Handling */}
            {item.image_url ? (
              <Image 
                source={{ uri: item.image_url }} 
                style={styles.image} 
              />
            ) : (
              <Image 
                source={require('./../../assets/images/hotel.jpg')} 
                style={styles.image} 
              />
            )}
            
            <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <Text style={styles.hotelAddress}>{item.address}</Text>
                <View style={styles.flexContainer}>
                    <Text style={styles.rating}>🌟 {item.rating}</Text>
                    <Text style={styles.price}>💰 {item.price}</Text>
                </View> 
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default HotelList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  hotelItem: {
    marginTop: 8,
  },
  hotelCard: {
    marginRight: 15,
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    paddingBottom: 10,
  },
  hotelInfo: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  hotelName: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  hotelAddress: {
    fontFamily: 'Outfit-Light',
    fontSize: 13,
    color: '#777',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 130,
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#333',
  },
  price: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: '#333',
  },
});
