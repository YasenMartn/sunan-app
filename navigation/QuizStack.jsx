import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Home from '../screens/Home';
import MultipleChoice from '../screens/MultipleChoice';
import Score from '../screens/Score';
import { resetScore } from '../redux/Slice';
import Tests from '../screens/Tests';
import CustomHeader from '../components/CustomHeader';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

const Stack = createStackNavigator();

const QuizStack = () => {

  const { colorScheme, setColorScheme } = useColorScheme();
  const [isMoonIcon, setIsMoonIcon] = useState(true);

  const dispatch = useDispatch();

  // change icon and theme
  const handleMoonIconPress = () => {
    setIsMoonIcon(!isMoonIcon);
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

  const screenOptions = ({ navigation, route }) => {

    const handleResetScore = () => {
      Alert.alert('', 'إعادة تعيين النتيجة لجميع الإختبارات ؟', [
        {
          text: 'لا',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'نعم', onPress: () => dispatch(resetScore()) },
      ]);
    };

    let headerLeft = null;

    if (route.name === 'أسئلة في الإسلام') {
      headerLeft = () => (
        <MaterialIcons
          name="delete"
          size={24}
          color="white"
          style={{ marginLeft: 15 }}
          onPress={handleResetScore}
        />
      );
    } else {
      headerLeft = () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        />
      );
    }

    return{
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'CairoB',
      },
      headerRight: () => (
        <MaterialIcons
          name="menu"
          size={24}
          color="white"
          style={{ marginRight: 15 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
      headerMode: "float",
      headerLeft,
    // headerLeft: () => (
    //   <MaterialIcons
    //     name="delete"
    //     size={24}
    //     color="white"
    //     style={{ marginLeft: 15 }}
    //     onPress={createAlert}
    //   />
    // ),
    // headerTitle: 'أسئلة في الإسلام',
    // header: (props) => <CustomHeader {...props} />
    }
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="أسئلة في الإسلام" component={Home} />
      <Stack.Screen name="Tests" component={Tests} />
      <Stack.Screen name="Exercise" component={MultipleChoice} />
      <Stack.Screen name="النتيجة" component={Score} />
    </Stack.Navigator>
  );
};

export default QuizStack;
