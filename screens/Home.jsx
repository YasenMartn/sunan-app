import { View, Text, ScrollView, Pressable, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { data } from '../data'

const Home = ({navigation}) => {

  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchKeyword.toLowerCase());
  });


  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white dark:bg-slate-800">
      {/* <View className="p-5">
       <TextInput
          className="border border-black dark:border-white dark:text-white p-3"
          placeholderTextColor={"white"}
          placeholder="Search..."
          onChangeText={(text) => setSearchKeyword(text)}
          value={searchKeyword}
        />
      </View> */}

      <View className="p-2 flex-wrap flex-row-reverse items-start justify-center">
        {filteredData.map((item, index) => (
          <View key={index} className="bg-white dark:bg-slate-500 w-40 shadow-lg shadow-black dark:shadow-white flex-grow m-2">
            <Pressable android_ripple={{color:"gray", foreground: true}} className="overflow-hidden items-center justify-center" 
              onPress={() => navigation.navigate("Details", {id: item.id, title: item.title})}
            >
              <Image source={require("../assets/green.png")} className="h-40 w-full bg-emerald-200 dark:bg-blue-400" resizeMode='cover'/>
              <View className="p-2 px-1">
                <Text className="font-[CairoB] text-lg dark:text-white">{item.title}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Home