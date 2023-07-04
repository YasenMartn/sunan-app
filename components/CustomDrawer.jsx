import { View, Text, Linking, Share, Pressable,} from "react-native";
import { DrawerContentScrollView, DrawerItemList,} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Switch } from "react-native-paper";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomDrawer = (props) => {

  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "#525252" : "#fff"


  const toggleDarkMode = async () => {
    if (colorScheme === 'dark') {
      setColorScheme('light');
      await AsyncStorage.setItem('theme', 'light');
    } else {
      setColorScheme('dark');
      await AsyncStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const getTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme) {
        setColorScheme(theme);
      }
    };
    getTheme();
  }, []);

  //share app
  const handleShareLink = async () => {
    try {
      const result = await Share.share({
        message: `أنصحك بتحميل تطبيق Sunan عبر هذا الرابط: ${"https://play.google.com/store/apps/details?id=com.kastan.sunan"}`,
        url: "https://play.google.com/store/apps/details?id=com.kastan.sunan",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  


  return (
    <View className="flex-1 bg-white dark:bg-slate-800">
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "transparent"}}>
        <View className="flex-1 ">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {/* Bottom Menu */}
      <View className="border-t-[1px] border-[#525252] dark:border-white">

        {/* donate */}
        {/* <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-5 py-4"
          onPress={() => Linking.openURL("https://paypal.me/Laghzaouna?country.x=MA&locale.x=en_US")}        
        >
          <MaterialCommunityIcons name="heart" size={24} color={color} />
          <Text className="mr-5 text-black  font-[CairoB] dark:text-white">دعم التطبيق</Text>
        </Pressable> */}

        {/* rate app */}
        <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-5 py-4" 
          onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.kastan.sunan")}        
        >
          <MaterialIcons name="star" size={24} color={color} />
          <Text className="mr-5 text-black font-[CairoB] dark:text-white">تقييم التطبيق</Text>
        </Pressable>

        {/* our other apps  */}
        <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-5 py-4"
          onPress={() => Linking.openURL("https://play.google.com/store/apps/dev?id=5331139693103010529")}        
        >
          <AntDesign name="appstore1" size={24} color={color} />
          <Text className="mr-5 text-black font-[CairoB] dark:text-white">تطبيقاتنا الأخرى</Text>
        </Pressable>

        {/* share app */}
        <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-5 py-4" 
          onPress={handleShareLink}
        >
          <Entypo name="share" size={24} color={color} />
          <Text className="mr-5 text-black font-[CairoB] dark:text-white">مشاركة التطبيق</Text>
        </Pressable>

        {/* contact me */}
        <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-5 py-4" 
          onPress={() => Linking.openURL("mailto:kastaninc@gmail.com")}      
        > 
          <MaterialCommunityIcons name="email" size={24} color={color} />
          <Text className="mr-5 text-black font-[CairoB] dark:text-white">تواصل معي</Text>
        </Pressable>

         {/* settings */}
         <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-5 py-4" 
       
        > 
          <MaterialIcons name="settings" size={24} color={color} />
          <Text className="mr-5 text-black font-[CairoB] dark:text-white">الإعدادات</Text>
        </Pressable>

        {/* dark mode */}
        <Pressable android_ripple={{color: "gray"}} className="flex-row-reverse items-center p-4" 
          onPress={() => toggleDarkMode()}      
        > 
          <Switch value={colorScheme === 'dark'} onValueChange={toggleDarkMode} color="#00ccbb" />
          <Text className=" text-black font-[CairoB] dark:text-white">الوضع الليلي</Text>
        </Pressable>

      </View>


    </View>
  );
};

export default CustomDrawer;
