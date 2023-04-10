import { View, Text } from 'react-native'
import React from 'react'
import Test from '../screens/Test'
import TestDet from '../screens/TestDet'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Stt = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="1" component={Test} />
    <Stack.Screen name="2" component={TestDet} />
  </Stack.Navigator>
  )
}

export default Stt