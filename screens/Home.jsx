import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { data } from '../data'
import { useSelector } from 'react-redux'

const Home = ({navigation}) => {

  const color = useSelector(state => state.app.themeColor)

  return (
    // <View className="p-5 flex-1 bg-slate-400">
      <ScrollView showsVerticalScrollIndicator={false}> 
        <View className="space-y-3 p-3 items-center justify-center ">
          {data.map(item => (
            <View key={item.id} style={{borderColor: color}} className="shadow-md shadow-black bg-white dark:bg-slate-700 w-full border-l-4">
              <Pressable 
                android_ripple={{color: "gray"}} className="p-4 flex-row space-x-5 justify-end items-center" 
                onPress={() => navigation.navigate("Details", {id: item.id, title: item.title})}
              >
    
                {item.sunan?.length > 0 && <Text className="font-[CairoB] text-lg dark:text-white">{item.sunan?.length}</Text>}
                <Text className="font-[CairoB] text-lg dark:text-white">{item.title}</Text>
                <View className="w-10 h-10 items-center justify-center rounded-md" style={{backgroundColor: color}}>
                  <Text className="font-bold text-white text-lg">{item.id}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    // </View>
  )
}

export default Home