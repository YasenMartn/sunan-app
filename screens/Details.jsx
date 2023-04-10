import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Swiper from 'react-native-swiper';
import { data } from '../data';

const Details = ({ route, navigation }) => {

  const { id } = route.params;
  const itemId = data.findIndex((item) => item.id === id);

  // const { title, number, mandatory, type, info, virtue, naming, before, after, time, way } = route.params.item

  // useEffect(() => {
  //   navigation.setOptions({ headerTitle: title })
  // }, [title])

  return (
    <Swiper showsButtons={false} showsPagination={false} index={itemId} loop={false}>
      {data.map(({id, title, number, mandatory, type, info, virtue, naming, before, after, time, way}) => (
        
      <View className="p-5 py-0 bg-white dark:bg-slate-800 flex-1" key={id}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View className="space-y-5 py-5">

            <Text className="font-[CairoB] text-lg text-center dark:text-white">{title}</Text>

            {info && 
            <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400">{info}</Text>}
            
            <View className="flex-row space-x-2 justify-end">
              <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400">{mandatory}</Text>
              <Text className="font-[CairoB] text-lg text-blue-500">حكمها:</Text>
            </View>

            <View className="flex-row space-x-2 justify-end">
              <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400 flex-shrink">{type}</Text>
              <Text className="font-[CairoB] text-lg text-[#00ccbb]">نوعها:</Text>
            </View>

            <View className="flex-row space-x-2 justify-end">
              <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400 flex-shrink">{number}</Text>
              <Text className="font-[CairoB] text-lg text-blue-500">ركعاتها:</Text>
            </View>

            {time &&
            <View className="justify-end">
              <Text className="font-[CairoB] text-lg text-[#00ccbb]">وقتها:</Text>
              <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400">{time}</Text>
            </View>}

            {way &&
            <View className="justify-end">
              <Text className="font-[CairoB] text-lg text-[#00ccbb]">طريقتها:</Text>
              <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400">{way}</Text>
            </View>}

            {before && 
            <View>
              <View className="flex-row space-x-2 justify-end">
                <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400">{before}</Text>
                <Text className="font-[CairoB] text-lg text-amber-500">سُنَّة قبليّة:</Text>
              </View>
              <Text className="font-[CairoB] dark:text-slate-400">سنن الصلاة القبلية هي التي تصلى قبل صلاة الفريضة تقربا إلى الله</Text>
            </View>}

            {after && 
            <View>
              <View className="flex-row space-x-2 justify-end">
                <Text className="font-[CairoB] text-lg text-right text-slate-500 dark:text-slate-400">{after}</Text>
                <Text className="font-[CairoB] text-lg text-red-500">سُنَّة بَعْدِيَّة:</Text>
              </View>
              <Text className="font-[CairoB] dark:text-slate-400">سنن الصلاة البعدية هي التي تصلى بعد صلاة الفريضة تقربا إلى الله</Text>
            </View>}

            {naming && 
            <View className="">
              <Text className="font-[CairoB] text-lg text-red-500">سبب التسمية:</Text>
              <Text className="font-[CairoB] text-lg text-slate-500 dark:text-slate-400 text-right">{naming}</Text>
            </View>}

            {virtue && 
              <View className="">
                <Text className="font-[CairoB] text-lg text-amber-500">فضلها:</Text>
                <View className="space-y-3">
                  {virtue.map((i, index) => (
                    <View key={index} className="space-y-2">
                      {i.title && <Text className="font-[CairoB] text-right dark:text-white">{i.title}</Text>}
                      <View className="space-y-2">
                        {i.sayings?.map((i, index) => (
                          <Text key={index} className="font-[CairoB] text-right text-slate-500 dark:text-slate-400">{i}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            }

          </View>
        </ScrollView>
      </View>

      ))}
    </Swiper>
  )
}

export default Details
