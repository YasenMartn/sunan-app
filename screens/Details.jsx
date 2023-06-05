import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { data } from '../data';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Details = ({ route, navigation }) => {

  const themeColor = useSelector(state => state.app.themeColor)

  const { id, title } = route.params;
  const foundItem = data.find(item => item.id === id);
  const { sunan } = foundItem;

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#525252' : '#fff';

  const [favorites, setFavorites] = useState([]);

  // Load favorites from AsyncStorage on component mount
  useEffect(() => {
    loadFavorites();
  }, []);

  // Check if an item is marked as favorite
  const isFavorite = (itemId) => favorites.includes(itemId);

  // Toggle the favorite status of an item
  const toggleFav = (itemId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(itemId)) {
        return prevFavorites.filter(favId => favId !== itemId);
      } else {
        return [...prevFavorites, itemId];
      }
    });
  }

  // Save favorites to AsyncStorage
  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Save favorites to AsyncStorage when the favorites state changes
  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="space-y-3 p-3 items-center justify-center ">
        {sunan?.map(item => (
          <View key={item.id}  style={{borderColor: themeColor}} className="shadow-md shadow-black bg-white dark:bg-slate-700 w-full border-r-4">
            <Pressable android_ripple={{ color: 'gray' }} className="p-2 pl-0 justify-between items-center flex-row"
              onPress={() => navigation.navigate('SunahDetails', { item })}
            >
              <IconButton
                onPress={() => toggleFav(item.id)}
                size={21}
                icon={() => (
                  <MaterialIcons name={isFavorite(item.id) ? 'favorite' : 'favorite-outline'} size={24}
                    color={isFavorite(item.id) ? 'red' : color}
                  />
                )}
              />
              <Text className="font-[CairoB] text-lg dark:text-white flex-shrink">{item.title}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Details;
