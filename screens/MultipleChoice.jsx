import { View, Text, Pressable, Alert, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { data } from '../data'
import { Button, IconButton, RadioButton } from 'react-native-paper';
import Animated, {ZoomIn, FadeOutDown, FadeIn, FadeInUp, Layout, Easing, FadeInDown, FadeOut, FadeOutRight, ZoomOut } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { updateScore } from '../redux/Slice';

const MultipleChoice = ({route, navigation}) => {

  // const data = useSelector(state => state.app.data)

  const {levelId, item} = route.params;

  const {id, questions, title, } = item;

  // const {questions} = data[id - 1]

  const [currentQues, setcurrentQues] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null);
  const [clicked, setclicked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);

  const questionsArr = questions[currentQues];

  const {just, justVerse} = questionsArr;

  const dataLength = questions.length

  // const score = (Math.floor((correctCount / dataLength) * 100))

  const dispatch = useDispatch();
  const score = (Math.floor((correctCount / dataLength) * 100))
  
  const correctAnswer = questions[currentQues].answer;

  const handleOptionClick = (item) => {
    setSelectedOption(item);
    const isCorrect = item === correctAnswer;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      setMistakeCount(mistakeCount + 1);
    }
    setclicked(true);
  }
  

  const handleAnswerSubmit = () => {
   
    // Move to the next question
    const nextQuestionIndex = currentQues + 1;
    if (nextQuestionIndex < questions.length) {
      setcurrentQues(nextQuestionIndex);
      setSelectedOption(null);
      setclicked(false)
    } else {
      navigation.navigate("النتيجة", {dataLength, correctCount, mistakeCount, id, levelId})
      setcurrentQues(0);
      setSelectedOption(null);
      dispatch(updateScore({score, id: levelId, testId: id,}))
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: title
    });
  }, [navigation, title]);

  // copy question
  const copyQ = async (q) => {
    await Clipboard.setStringAsync(q); 
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

 
  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>

      <View className="flex-1 p-3 justify-between  pb-20">

      {/* <Text>correct: {correctCount} wrong: {mistakeCount} score: {score}</Text> */}
    
      <View className="shadow-md shadow-black bg-white dark:bg-slate-700 rounded-md overflow-hidden">

        {/* <IconButton
          icon="content-copy"
          size={20}
          onPress={() => copyQ(currentQues + 1 + ". " + questionsArr.ques)}
        /> */}

        <View className="p-3">
          <Text className="text-black dark:text-white text-lg font-[CairoB]" selectable={true}>
            {questions.length} / {currentQues + 1}  {questionsArr.ques}
          </Text>
        </View>

        {questionsArr.options.map((item, index) => (
          <View key={index} className="">
            {index === 0 && <View className="bg-gray-500 dark:bg-[#c9d2d9] h-[1px]"></View>}
            <Pressable android_ripple={{color: "gray"}} 
              disabled={clicked == true && true}
              className={`p-3 flex-row-reverse items-center justify-between 
                ${clicked == true && item == correctAnswer ? "bg-emerald-100 dark:bg-emerald-200" 
                : clicked == true && "bg-rose-100 dark:bg-rose-200"}
              `}
              onPress={() => handleOptionClick(item) }
            >
              <Text className={`text-black dark:text-white font-[CairoR] text-lg
                ${clicked == true && item == correctAnswer ? "text-emerald-600" : clicked == true && "text-rose-600"}
              `}>
                {item}
              </Text>

              {clicked == true && item == correctAnswer ?
                <Animated.View layout={Layout.duration(200).delay(200)} entering={ZoomIn} exiting={ZoomOut}>
                  <MaterialCommunityIcons name="check" size={24} color="#059669" />
                </Animated.View>
              : clicked == true &&
                <Animated.View layout={Layout.duration(200).delay(200)} entering={ZoomIn} exiting={ZoomOut}>
                  <Feather name="x" size={24} color="#e11d48" /> 
                </Animated.View>
              }

            </Pressable>
           {/* {index !== questionsArr.options.length - 1 && 
            <View className="bg-gray-500 dark:bg-[#c9d2d9] h-[1px]"></View>
           } */}
            <View className="bg-gray-500 dark:bg-[#c9d2d9] h-[1px] "></View>
          </View>
        ))}

        {clicked && just &&
          <Animated.View className="p-3 space-y-2 items-end bg-emerald-100 dark:bg-emerald-200" layout={Layout.duration(200).delay(200)} entering={FadeIn} exiting={FadeOut}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#059669" />
            {just && <Text className="text-xl text-emerald-600 font-[CairoR] pt-2 leading-8">{just}</Text>}
            {justVerse && <Text className="text-xl text-emerald-600 leading-8">{justVerse}</Text>}
          </Animated.View>
        }

      </View>
      </View>
      </ScrollView>

     

      <View className="p-3">
        {clicked && 
        <Animated.View layout={Layout.duration(200).delay(200)} entering={ZoomIn} exiting={ZoomOut} className="">
          <Pressable onPress={handleAnswerSubmit} android_ripple={{color: "gray"}} className="w-full bg-blue-500 pt-1 rounded-md p-3 absolute bottom-0">
            <Text className="font-[CairoB] text-white text-center">متابعة</Text> 
          </Pressable>  
        </Animated.View>}
      </View>
      
    </View>
  )
}

export default MultipleChoice;