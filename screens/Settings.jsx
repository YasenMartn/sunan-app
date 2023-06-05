import { View, Text, Pressable, 
  Modal, 
  TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
// import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { changeThemeColor } from '../redux/Slice';
import { useColorScheme } from 'nativewind';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const Settings = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const { colorScheme, setColorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "#000" : "#fff"

  const themeColor = useSelector(state => state.app.themeColor)
  const dispatch = useDispatch();

  const themes = [
    {
      bg: "bg-red-500",
      color: "#ef4444",
    },
    {
      bg: "bg-orange-500",
      color: "#f97316",
    },
    {
      bg: "bg-yellow-500",
      color: "#eab308",
    },
    {
      bg: "bg-amber-500",
      color: "#f59e0b",
    },
    {
      bg: "bg-green-500",
      color: "#22c55e",
    },
    {
      bg: "bg-emerald-500",
      color: "#10b981",
    },
    {
      bg: "bg-blue-500",
      color: "#3b82f6",
    },
    {
      bg: "bg-indigo-500",
      color: "#6366f1",
    },
    {
      bg: "bg-violet-500",
      color: "#8b5cf6",
    },
    {
      bg: "bg-pink-500",
      color: "#ec4899",
    },
    // {
    //   bg: "bg-black",
    //   color: "#000000",
    // },
  ]

  return (
    <View className="">

        <Modal 
          visible={modalVisible} 
          transparent={true} 
          animationType="fade" 
          onRequestClose={() => setModalVisible(false)}
          statusBarTranslucent={true}
        >
          <Pressable className="flex-1 justify-center items-center bg-[#00000080]" activeOpacity={1} onPress={() => setModalVisible(false)}>
            <View className="bg-white dark:bg-slate-700 p-5">
              <Text className="text-lg font-bold dark:text-white">Theme Color</Text>
              <View className=" flex-row items-center justify-center flex-wrap w-[90%]">
                {themes.map((item, index) => (
                  <View className="rounded-md overflow-hidden w-11 h-11 m-2" key={index}>
                    <Pressable  className={`${item.bg} w-11 h-11 items-center justify-center `} 
                      android_ripple={{color: "gray"}} onPress={() => dispatch(changeThemeColor(item.color)) }
                    >
                      {themeColor === item.color && <MaterialIcons name="check" size={24} color="white" />}
                    </Pressable>
                  </View>
                ))}
              </View>
              <Button onPress={toggleModal} className="self-end rounded-none">CLOSE</Button>
            </View>
          </Pressable>
        </Modal>
      {/* <Modal
        isVisible={modalVisible}
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0
        }}
      >
        <View className="bg-white dark:bg-slate-700 p-5">
          <Text className="text-lg font-bold dark:text-white">Theme Color</Text>
          <View className=" flex-row items-center justify-center flex-wrap w-[90%]">
            {themes.map((item, index) => (
              <View className="rounded-md overflow-hidden w-11 h-11 m-2">
                <Pressable key={index} className={`${item.bg} w-11 h-11 items-center justify-center `} 
                  android_ripple={{color: "gray"}} onPress={() => dispatch(changeThemeColor(item.color)) }
                >
                  {themeColor === item.color && <MaterialIcons name="check" size={24} color="white" />}
                </Pressable>
              </View>
            ))}
          </View>
          <Button onPress={toggleModal} className="self-end rounded-none">CLOSE</Button>
        </View>
      </Modal> */}

      {/* change theme */}
      <Pressable className="p-5 flex-row items-center space-x-5" android_ripple={{color: "gray"}} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="palette-swatch" size={24} color={color} />
        <View>
          <Text className="text-black dark:text-white">Theme</Text>
          <Text className="text-slate-500 dark:text-slate-400">Change the app color theme.</Text>
        </View>
      </Pressable>


    </View>
  )
}

export default Settings

