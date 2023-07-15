import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { data } from '../data'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind'
const Home = ({navigation}) => {

  const color = useSelector(state => state.app.themeColor.list)
  const textColor = useSelector(state => state.app.themeColor.background)
  const p = "pink-400"

  const countTotalObjects = (arr) => {
    let count = 0;

    arr.forEach((item) => {
      if (item.hasOwnProperty('sunan')) {
        count += countTotalObjects(item.sunan); // Recursively count objects in nested arrays
      } else {
        count++; // Increment count for the current object
      }
    });

    return count;
  };

  const totalObjects = countTotalObjects(data);

  useEffect(() => {
    navigation.setOptions({
      title: totalObjects + " سنة" ,
    });
  }, [navigation]);


  const { colorScheme, setColorScheme } = useColorScheme();
  const cardColor = colorScheme === "dark" ? textColor : "white"
  const numberColor = colorScheme === "dark" ? "white" : textColor

  return (
    <ScrollView showsVerticalScrollIndicator={false}> 
      <View className="space-y-3 p-3 items-center justify-center ">
        {data.map((item, index) => (
          <View key={item.id} className={`shadow-md ${color} shadow-black dark:bg-slate-700 w-full rounded-md`}>
            <Pressable 
              android_ripple={{color: "gray"}} className="p-4 flex-row space-x-5 justify-end items-center" 
              onPress={() => navigation.navigate("Details", {id: item.id, title: item.title})}
            >
              {item.sunan?.length > 0 && <Text className="font-[CairoB] text-lg text-white">{item.sunan?.length}</Text>}
              <Text className="font-[CairoB] text-lg text-white flex-shrink">{item.title}</Text>
              <View className="w-10 h-10 items-center justify-center rounded-md " style={{backgroundColor: cardColor}} >
                <Text className={`font-bold text-lg`} style={{color: numberColor}} >{index + 1}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Home