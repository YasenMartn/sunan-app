import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Morning from '../screens/Morning';
import Night from '../screens/Night';

const Tab = createMaterialTopTabNavigator();


const screenOptions = {
  tabBarActiveTintColor: 'white',
  // tabBarInactiveTintColor: 'gray',
  // tabBarStyle: { backgroundColor: '#00ccbb' },
  tabBarIndicatorStyle: { backgroundColor: '#fff' },
  tabBarLabelStyle: { fontFamily: 'CairoB', },
};

const MaterialTopTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="أذكار المساء" component={Night} />
      <Tab.Screen name="أذكار الصباح" component={Morning} />
    </Tab.Navigator>
  )
}

export default MaterialTopTabs;