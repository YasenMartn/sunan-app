import { View, Text, Pressable, ScrollView, ToastAndroid, Share } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';

const SunahDetails = ({route, navigation}) => {

  const {item} = route.params;
  const {title, desc, ahadith} = item;

  useEffect(() => {
    navigation.setOptions({
      title: title
    });
  }, [navigation, title]);

  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#525252' : '#fff';
  const themeColor = useSelector(state => state.app.themeColor)

  //copy 
  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text); 
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };
  //share
  const handleShare = (text) => {
    Share.share({
      message: text
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-5 space-y-3">
        <Text className="font-[CairoB] text-lg dark:text-white">{desc}</Text>
        <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>الأحاديث التي تدل على ذلك:</Text>

        {ahadith?.map(item => {
          const parts = item.title.split(/(".*?")/);
          return (
            <View className="bg-slate-200 dark:bg-slate-700 w-full" key={item.id}>
              <View className="p-3">
                <Text key={item.id} className="font-[CairoB] text-lg dark:text-white pt-1 leading-8">
                  {parts?.map((item, index) => {
                    if (item.startsWith('"') && item.endsWith('"')) {
                      // Render the text between quotes in red, including the quotes
                      return <Text style={{color: themeColor}} key={index}>{item}</Text>;
                    } else {return item}
                  })}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <IconButton icon="heart" iconColor={color}/>
                <View className="flex-row">
                  <IconButton icon="share-variant" iconColor={color} onPress={() => handleShare(item.title)}/>
                  <IconButton icon="content-copy" iconColor={color} onPress={() => handleCopy(item.title)}/>
                </View>
              </View>
            </View>
          );
        })}

      </View>
    </ScrollView>
  )
}

export default SunahDetails