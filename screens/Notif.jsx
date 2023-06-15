import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, Text, View } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const items = [
    { id: 1, title: 'Apple' },
    { id: 2, title: 'Banana' },
    { id: 3, title: 'Orange' },
  ];

  const goToDetails = (itemId) => {
    navigation.navigate('Details', { itemId });
  };


  return (
    <View className="p-5">
      {items.map((item) => (
        <Pressable android_ripple={{color: "gray"}} key={item.id} className="p-5 bg-rose-400" onPress={() => goToDetails(item.id)}>
          <Text>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const DetailsScreen = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View className="p-5">
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
    </View>
  );
};

const Notif = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default Notif;
