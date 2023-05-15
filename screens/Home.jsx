import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
// import { data } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllTests } from '../redux/Slice'

const Home = ({navigation}) => {

  const data = useSelector(state => state.app.data)

  const dispatch = useDispatch();

  const createAlert = (id) =>
    Alert.alert('', 'إعادة تعيين النتيجة لجميع الإختبارات ؟', [
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
              onLongPress={() => createAlert(item.id)}
            >
              <Image source={item.img} className="h-40 w-full bg-white dark:bg-slate-700" resizeMode='contain'/>
              <View className="p-2">
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