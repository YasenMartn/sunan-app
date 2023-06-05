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

const FavoritesScreen = () => {

  const favorites = useSelector(state => state.app.fav);
  const dispatch = useDispatch();
  const handleRemoveFromFav = (id) => {
    dispatch(removeFromFav(id));
  };

  return (
    <View>
      {favorites.map(item => (
        <Pressable key={item.id} android_ripple={{color: "gray"}} className="p-5 flex-row justify-between">
          <Text>{item.title}</Text>
          <IconButton
            onPress={() => {handleRemoveFromFav(item.id)}}
            size={21}
            icon={() => (
              <MaterialIcons
                name={'favorite'}
                size={24}
                color={'red'}
              />
            )}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FavoritesScreen;
