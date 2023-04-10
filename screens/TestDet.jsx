import { View, Text } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { data } from '../data';

const TestDet = ({ route }) => {

  const { id } = route.params;
  const itemId = data.findIndex((item) => item.id === id);

  return (
    <Swiper showsButtons={false} showsPagination={false} index={itemId} loop={false} className="bg-green-300 items-center justify-center p-5">
      {data.map((item) => (
        <View key={item.id} className="bg-purple-400 w-20">
          <Text>{item.title}</Text>
        </View>
      ))}
    </Swiper>
  )
}

export default TestDet