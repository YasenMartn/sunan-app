import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
// import { data } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllTests } from '../redux/Slice'
import { Ionicons } from '@expo/vector-icons';

const Home = ({navigation}) => {

  const data = useSelector(state => state.app.data)

  const dispatch = useDispatch();

  const createAlert = (id, title) =>
    Alert.alert('', `إعادة تعيين النتيجة لجميع إختبارات ${title} ؟ `, [
      {
        text: 'لا',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'نعم', onPress: () => dispatch(resetAllTests({id})) },
  ]);


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 p-3 flex flex-wrap flex-row gap-3 items-start justify-center">
        {data?.map((item, index) => (
          <View key={index} className="w-44 bg-white shadow-md shadow-black justify-between flex-grow dark:bg-slate-700">
            <Pressable android_ripple={{color: "gray", foreground: true}} 
              onPress={() => navigation.navigate("Tests", {id: item.id, title: item.title})}
              onLongPress={() => createAlert(item.id, item.title)}
            >
              <Image source={item.img} className="h-40 w-full bg-white dark:bg-slate-700" resizeMode='contain'/>
              <View className="p-2 flex-row justify-center space-x-3">
                
                {item.tests.every(test => test.score === 100) && <Ionicons name="md-trophy-sharp" size={24} color="#10b981" />}
                <Text className="text-black dark:text-white text-center font-[CairoB] text-lg">{item.title}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Home;