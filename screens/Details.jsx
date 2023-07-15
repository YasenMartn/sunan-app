import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { data } from '../data';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton, TextInput } from 'react-native-paper';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Details = ({ route, navigation }) => {

  const themeColor = useSelector(state => state.app.themeColor.list)

  const { id, title } = route.params;
  const foundItem = data.find(item => item.id === id);
  const { sunan } = foundItem;

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#fff' : '#fff';

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

  //searchbar
  const [searchText, setSearchText] = useState('');
  const filteredItems = sunan.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* <View className="p-2">
        <TextInput 
          mode='outlined' 
          placeholder='search'  
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
      </View> */}

      <View className="space-y-3 p-3 items-center justify-center ">
        {filteredItems?.map(item => (
          <View key={item.id} className={`shadow-md shadow-black ${item.color ? item.color : themeColor} dark:bg-slate-700 w-full rounded-md`}>
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
              <Text className="font-[CairoB] text-lg text-white flex-shrink">{item.ahadith?.length}</Text>
              <Text className="font-[CairoB] text-lg text-white flex-shrink">{item.title}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Details;
