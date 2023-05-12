import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import QuizStack from '../navigation/QuizStack';
const Z = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <NavigationContainer>
          <QuizStack/>
      </NavigationContainer>

    </>
  )
}

export default Z