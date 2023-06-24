import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const items = [
  { 
    title: 'سبحان الله والحمد لله', 
    desc: '#00ccbb' 
  },
  { 
    title: 'الله أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لله كَثِيرًا، وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيلًا', 
    desc: 'قال النبي صلى الله عليه وسلم: "عَجِبْتُ لَهَا، فُتِحَتْ لَهَا أَبْوَابُ السَّمَاءِ"',
  },
  { 
    title: 'لا إله إلا الله', 
    desc: 'أفضل الذكر',
  },
];

const Misbaha = () => {

  const color = useSelector(state => state.app.themeColor.list)
  const textColor = useSelector(state => state.app.themeColor.background)
  const [counter, setcounter] = useState(0)

  return (
    <View className="p-3 flex-1 items-center justify-between">
      <View className="h-52">
        <Swiper loop={false}>
          {items.map((item, index) => (
            <View key={index} className={`${color} items-center justify-center p-5 rounded-md`}>
              <Text className="text-white text-xl">{item.title}</Text>
              <Text className="text-white text-xl">{item.desc}</Text>
            </View>
          ))}
        </Swiper>
      </View>

      <View className="overflow-hidden rounded-md">
        <Pressable 
          className="p-5 w-20 items-center justify-center" 
          android_ripple={{color: "gray"}} style={{backgroundColor: textColor}}
          onPress={() => setcounter(counter + 1)}
        >
          <Text className="text-white text-4xl">{counter}</Text>
        </Pressable>
      </View>
      
    </View>
  )
}

export default Misbaha