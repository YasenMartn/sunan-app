import React, { useEffect, useState } from 'react';
import { Appbar, Button, Portal } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { Text , Modal, View, TouchableWithoutFeedback} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetScore } from '../redux/Slice';
import { useDispatch } from 'react-redux';

const CustomHeader = ({ navigation,route, options, back,}) => {

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);


  // color scheme dark/light mode
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleMoonIconPress = () => {
    toggleDarkMode();
  };

  // dark mode
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


  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Appbar.Header className="bg-[#3e8c84]" mode='center-aligned'>

       
          <Appbar.Action 
            icon={() => <Ionicons name={colorScheme === "light" ? "ios-moon" : "ios-sunny"} size={24} color="white" />} 
            iconColor='white'
            onPress={handleMoonIconPress}
          />
        

        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

        <Appbar.Content title={title} 
          titleStyle={{fontFamily: "CairoB", paddingTop: 20}} 
        />
        
        <Appbar.Action icon="delete" iconColor='white' onPress={toggleModal}/>
        
        <Appbar.Action icon="menu" iconColor='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>

      </Appbar.Header>


      <Modal visible={isModalVisible} transparent={true} onRequestClose={toggleModal} animationType='fade'>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View className="flex-1 items-center justify-center bg-[#00000080] p-5">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="p-5 bg-white dark:bg-slate-700 w-full space-y-3">
                <Text className="dark:text-white font-[CairoB] text-lg">إعادة تهيئة النتائج لجميع الإختبارات؟</Text>
                <View className="flex-row justify-end">
                  <Button textColor='blue' labelStyle={{fontFamily: "CairoB"}} 
                    onPress={toggleModal} style={{borderRadius: 5}}
                  >
                    لا
                  </Button>
                  <Button textColor='blue' labelStyle={{fontFamily: "CairoB"}} 
                    onPress={() => {dispatch(resetScore()); toggleModal()}} style={{borderRadius: 5}}
                  >
                    نعم
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </>
  );
}

export default CustomHeader;