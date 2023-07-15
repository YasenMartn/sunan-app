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
  const {title, desc, ahadith, ayat, def, words} = item;

  //title
  // useEffect(() => {
  //   const shortenedTitle = title.slice(0, 20);
  //   navigation.setOptions({
  //     title: shortenedTitle + "..."
  //   });
  // }, [navigation, title]);
  
  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#525252' : '#fff';
  const themeColor = useSelector(state => state.app.themeColor.background)

  //copy 
  const handleCopy = async (text, source) => {
    await Clipboard.setStringAsync(text + "\n" + source); 
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

  //share
  const handleShare = (text, source) => {
    Share.share({
      message: text + "\n" + source
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="p-3 space-y-3">
        {title && <Text className="font-[CairoB] text-lg dark:text-white text-center">{title}</Text>}
        {/* {desc && <Text className="font-[CairoB] text-lg dark:text-white">{desc}</Text>} */}

        {/* {def && <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>ما هي ؟</Text>} */}
        {def && 
          <View style={{backgroundColor: themeColor}} className="p-3 rounded-lg">
            <Text className="font-[CairoR] text-lg text-white" >{def}</Text>
          </View>
        }

        <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>الأحاديث التي تدل على ذلك:</Text>

        {ahadith?.map(item => {
          const parts = item.title.split(/(".*?")/);
          return (
            <View key={item.id} className="space-y-3">

              <View className="bg-white shadow-md shadow-black dark:bg-slate-700 w-full" >
                <View className="p-3">
                  <Text key={item.id} className=" text-xl font-bold dark:text-white pt-1 leading-8">
                    {parts?.map((item, index) => {
                      if (item.startsWith('"') && item.endsWith('"')) {
                        // Render the text between quotes in red, including the quotes
                        return <Text key={index} style={{color: themeColor}}>{item}</Text>
                        ;
                      } else {return item}
                    })}
                  </Text>
                  <Text className="text-base font-bold dark:text-white pt-1 leading-8">{item.source}</Text>
                  {/* <Text className="text-base font-bold dark:text-white pt-1 leading-8">المصدر: {item.source}</Text> */}
                </View>
                <View className="flex-row justify-between">
                  <IconButton icon="heart" iconColor={color}/>
                  <View className="flex-row">
                    <IconButton icon="share-variant" iconColor={color} onPress={() => handleShare(item.title, item.source)}/>
                    <IconButton icon="content-copy" iconColor={color} onPress={() => handleCopy(item.title, item.source)}/>
                  </View>
                </View>
              </View>

              <View>
                {item.words && 
                  <View className="">
                    <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>شرح المفردات:</Text>
                    <View className="bg-white shadow-md shadow-black p-3 w-full space-y-3 dark:bg-slate-700">
                      {item.words?.map((item, index) => (
                        <View key={index}>
                          <Text className="font-bold text-lg" style={{color: themeColor}}>{item.title}</Text>
                          <Text className="font-bold text-lg dark:text-white">{item.desc}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                }
              </View>
                
             {item.expl && 
              <View>
                  <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>شرح الحديث:</Text>
                  <View className="bg-white shadow-md shadow-black p-3 w-full">
                    <Text className=" text-xl font-bold dark:text-white pt-1 leading-8">{item.expl}</Text>
                  </View>
                </View>
              }
            </View>
          );
        })}

        {words && 
          <>
            <Text className="font-[CairoB] text-lg" style={{color: themeColor}}>شرح المفردات:</Text>
            <View className="bg-white shadow-md shadow-black p-3 w-full space-y-3 dark:bg-slate-700">
              {words?.map((item, index) => (
                <View key={index}>
                  <Text className="font-bold text-lg" style={{color: themeColor}}>{item.title}</Text>
                  <Text className="font-bold text-lg dark:text-white">{item.desc}</Text>
                </View>
              ))}
            </View>
          </>
        }


      </View>
    </ScrollView>
  )
}

export default SunahDetails