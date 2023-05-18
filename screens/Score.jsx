import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateScore } from '../redux/Slice';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useState } from 'react';
import { useEffect } from 'react';

const Score = ({route, navigation}) => {

  const { dataLength, correctCount, mistakeCount, id, levelId } = route.params;
  const score = (Math.floor((correctCount / dataLength) * 100))
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(updateScore({score, id: levelId, testId: id,}))
    navigation.pop(2)
  }

  //animating number
  const [number, setNumber] = useState(0);
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animateNumber();
  }, []);

  const animateNumber = () => {
    const chosenNumber = score || 100;

    animatedValue.value = 0; // Reset the animated value to 0
    setNumber(0); // Reset the displayed number to 0
    for (let i = 1; i <= chosenNumber; i++) {
      setTimeout(() => {
        animatedValue.value = withTiming(i, { duration: 10 }); // Update the animated value with a smooth animation
        setNumber(i); // Update the displayed number
      }, i * 10); // Delay the animation by i * 10 milliseconds
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const textColor = number >= 50 ? '#10b981' : '#f43f5e';

    return {
      fontSize: 100,
      fontWeight: 'bold',
      color: textColor,
    };
  });

  return (
    <View className="p-5 flex-1 items-center justify-center">
       <Animated.Text style={animatedStyle}>{number}%</Animated.Text>


      {/* <Text className={`font-[CairoB] text-5xl pt-5 dark:text-white ${score >= 50 ? "text-emerald-600" : "text-rose-600"}`}>
        النتيجة: %{score}
      </Text> */}
      <Text className="font-[CairoB] text-lg dark:text-white">الإجابات الصحيحة: {correctCount}</Text>
      <Text className="font-[CairoB] text-lg dark:text-white">الإجابات الخاطئة: {mistakeCount}</Text>
      <View className="overflow-hidden rounded-md absolute bottom-5 w-full">
        <Pressable onPress={handleNext} android_ripple={{color: "white"}} 
          className="bg-blue-500 pt-1 p-3  "
        >
          <Text className="font-[CairoB] text-white text-center">متابعة</Text> 
        </Pressable>  
      </View>
    </View>
  )
}

export default Score;