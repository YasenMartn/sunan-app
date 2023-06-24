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
    const shortenedTitle = title.slice(0, 30);
    navigation.setOptions({
      title: shortenedTitle
    });
  }, [navigation, title]);
  
  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#525252' : '#fff';
  const themeColor = useSelector(state => state.app.themeColor.background)

  //copy 
  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text); 
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

  const handleCopy2= async (text) => {
    const textWithoutQuotes = text.replace(/"/g, '');
    await Clipboard.setStringAsync(textWithoutQuotes); 
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
      <View className="p-3 space-y-3">
        {title && <Text className="font-[CairoB] text-lg dark:text-white text-center">{title}</Text>}
        {desc && <Text className="font-[CairoB] text-lg dark:text-white">{desc}</Text>}
        <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>الأحاديث التي تدل على ذلك:</Text>

        {ahadith?.map(item => {
          const parts = item.title.split(/(".*?")/);
          return (
            <View key={item.id} className="space-y-3">
              <View className="bg-slate-200 dark:bg-slate-700 w-full">
                <View className="p-3">
                  <Text key={item.id} className=" text-xl font-bold dark:text-white pt-1 leading-8">
                    {parts?.map((item, index) => {
                      if (item.startsWith('"') && item.endsWith('"')) {
                        // Render the text between quotes in red, including the quotes
                        return <Text key={index} style={{color: themeColor}}>{item}</Text>
                        ;
                      } else {return item}
                    })}
                    <Text className="text-base font-bold dark:text-white pt-1 leading-8"> {item.source}</Text>
                  </Text>
                  {/* <Text className="text-base font-bold dark:text-white pt-1 leading-8">المصدر: {item.source}</Text> */}
                </View>
                <View className="flex-row justify-between">
                  <IconButton icon="heart" iconColor={color}/>
                  <View className="flex-row">
                    <IconButton icon="share-variant" iconColor={color} onPress={() => handleShare(item.title)}/>
                    <IconButton icon="content-copy" iconColor={color} onPress={() => handleCopy(item.title)}/>
                  </View>
                </View>
                <View className="p-3">
                  <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>شرح المفردات:</Text>
                  {item.words?.map((item, index) => (
                    <View key={index}>
                      <Text className="font-bold text-lg">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

             {item.expl && <View>
                <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>شرح الحديث:</Text>
                <View>
                  <Text className=" text-xl font-bold dark:text-white pt-1 leading-8">{item.expl}</Text>
                </View>
              </View>}

            
            </View>
          );
        })}

      </View>
    </ScrollView>
  )
}

export default SunahDetails