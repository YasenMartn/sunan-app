
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from 'react-native-paper';

const DarkThemeToggle = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleDarkMode = async () => {
    if (colorScheme === 'dark') {
      setColorScheme('light');
      await AsyncStorage.setItem('theme', 'light');
    } else {
      setColorScheme('dark');
      await AsyncStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const getTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme) {
        setColorScheme(theme);
      }
    };
    getTheme();
  }, []);

  return (
    <View
      className='bg-gray-300 dark:bg-gray-800 flex-1 p-5'
    
    >
      <Text className='text-gray-700 dark:text-white ml-2'>
        {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </Text>
      {/* <Button title='toggle'   onPress={toggleDarkMode}/> */}
      <Switch value={colorScheme === 'dark'} onValueChange={toggleDarkMode} />

    </View>
  );
};

export default DarkThemeToggle;
