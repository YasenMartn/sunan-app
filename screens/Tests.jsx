import { View, Text, Pressable, ScrollView, Alert, } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { resetSingleTest } from '../redux/Slice';

const Tests = ({ navigation, route }) => {

  const {id, title} = route.params;

  const data = useSelector(state => state.app.data);

  const {tests} = data[id - 1];

  useEffect(() => {
    navigation.setOptions({
      title: title
    });
  }, [navigation, title]);

  const dispatch = useDispatch();

  const resetTest = () => {
    createAlert()
  }

  const createAlert = (testId) =>
  Alert.alert('', 'إعادة تعيين نتيجة الإختبار؟', [
    {
      text: 'لا',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'نعم', onPress: () => dispatch(resetSingleTest({id, testId})) },
  ]);


  return (
    <View className="flex-1 bg-white dark:bg-slate-800">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center flex-wrap flex-row gap-3 p-3 py-5">
          {tests?.map((item, index) => (
            <View key={index} className={`w-44 shadow-lg items-end shadow-black h-40
              ${item.score >= 50 && item.taken == true ? "bg-emerald-200" 
              : item.taken == false ? "bg-white dark:bg-slate-700" : "bg-rose-200"}`}
            >
                
              <Pressable className="p-3 w-full h-full justify-between" android_ripple={{color: "#3e8c84"}} 
                onPress={() => navigation.navigate("Exercise", {levelId: id, item: item, title: item.title})}
                onLongPress={() => createAlert(item.id)}
              >

                <Text className={`font-[CairoB] text-xl 
                  ${item.score >= 50 && item.taken == true ? "text-emerald-600" : item.taken == false ? 
                  "text-slate-900 dark:text-white" : "text-rose-600"}`}
                >
                  {item.title} 
                </Text>

                <Text className={`font-[CairoB] text-xl 
                  ${item.score >= 50 && item.taken == true ? "text-emerald-600" : item.taken == false ? 
                  "text-slate-900 dark:text-white" : "text-rose-600"}`}
                >
                  {item.questions.length} 
                </Text>

                <Text className={`font-[CairoB] text-lg
                  ${item.score >= 50 && item.taken == true ? "text-emerald-600" 
                  : item.taken == false ? "text-slate-500 dark:text-slate-400" 
                  : "text-rose-600"}`}
                >
                  النتيجة: %{item.score}
                </Text>
                
              {/* 
                <View className="bg-blue-500 rounded-md overflow-hidden self-end shadow-sm shadow-black">
                  <Pressable className="p-3 px-7 items-center flex-row" 
                    android_ripple={{color: "white"}} 
                    onPress={() => navigation.navigate("Exercise", {levelId: id, item: item})}
                  >
                    <Text className="font-[CairoB] text-white">البدأ</Text>
                  
                  </Pressable>
                </View> */}

              </Pressable>
            </View>
          ))} 
        </View>
      </ScrollView>
    </View>
    
  )
}

export default Tests;