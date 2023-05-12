import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateScore } from '../redux/Slice';

const Score = ({route, navigation}) => {

    const { dataLength, correctCount, mistakeCount, id, levelId } = route.params;
    const score = (Math.floor((correctCount / dataLength) * 100))
    const dispatch = useDispatch();

    const handleNext = () => {
      dispatch(updateScore({score, id: levelId, testId: id,}))
      navigation.pop(2)
    }

  return (
    <View className="p-5 flex-1 items-center justify-center">
      <Text className="font-[CairoB] text-5xl pt-5 dark:text-white">النتيجة: %{score}</Text>
      <Text className="font-[CairoB] text-lg dark:text-white">الإجابات الصحيحة: {correctCount}</Text>
      <Text className="font-[CairoB] text-lg dark:text-white">الإجابات الخاطئة: {mistakeCount}</Text>
      <Pressable onPress={handleNext} className=" bg-blue-500 pt-1 rounded-md p-3 w-full absolute bottom-5">
          <Text className="font-[CairoB] text-white text-center">متابعة</Text> 
        </Pressable>  
    </View>
  )
}

export default Score;