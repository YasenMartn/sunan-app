import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import Home from '../screens/Home';
import CustomHeader from '../components/CustomHeader';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import Details from '../screens/Details';
import SunahDetails from '../screens/SunahDetails';

const Stack = createStackNavigator();

const QuizStack = () => {

  const { colorScheme, setColorScheme } = useColorScheme();
  const [isMoonIcon, setIsMoonIcon] = useState(true);

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
      // headerLeft,
      // headerTitle: 'أسئلة في الإسلام',
      // header: (props) => <CustomHeader {...props} />
    }
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="السنن" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="SunahDetails" component={SunahDetails} />
    </Stack.Navigator>
  );
};

export default QuizStack;
