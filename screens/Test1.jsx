import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, removeFromFav } from '../redux/Slice';

const data = [
  {
    id: 1,
    title: "apple",
  },
  {
    id: 2,
    title: "banana",
  },
  {
    id: 3,
    title: "orange",
  },
];

const Test1 = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#525252' : '#fff';
  const favorites = useSelector(state => state.app.fav);
  const dispatch = useDispatch();

  const handleAddToFav = (item) => {
    dispatch(addToFav(item));
  };

  const handleRemoveFromFav = (id) => {
    dispatch(removeFromFav(id));
  };

  const isFavorite = (id) => {
    return favorites.some(favorite => favorite.id === id);
  };

  return (
    <View>
      {data.map(item => (
        <Pressable key={item.id} android_ripple={{color: "gray"}} className="p-5 flex-row justify-between">
          <Text>{item.title}</Text>
          <IconButton
            onPress={() => {
              if (isFavorite(item.id)) {
                handleRemoveFromFav(item.id);
              } else {
                handleAddToFav(item);
              }
            }}
            size={21}
            icon={() => (
              <MaterialIcons
                name={isFavorite(item.id) ? 'favorite' : 'favorite-border'}
                size={24}
                color={isFavorite(item.id) ? 'red' : color}
              />
            )}
          />
        </Pressable>
      ))}
      <View className="p-5">
        {favorites.map((item, index) => (
          <Text key={index}>{item.title} {item.id}</Text>
        ))}
      </View>
    </View>
  );
};

export default Test1;
