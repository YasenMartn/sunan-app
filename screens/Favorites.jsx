import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavoriteIds(parsedFavorites);
        console.log(parsedFavorites)
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  return (
    <View>
      {/* {favoriteIds.map((id) => (
        <View key={id}>
          <Text>{id}</Text>
        </View>
      ))} */}
    </View>
  );
};

export default Favorites;
