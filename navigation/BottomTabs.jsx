import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import QuizStack from './QuizStack';
import Misbaha from '../screens/Misbaha';
import MaterialTopTabs from './MaterialTopTabs';

const Tab = createBottomTabNavigator();



const BottomTabs = () => {

  const { colorScheme, setColorScheme } = useColorScheme();

  const screenOptions = {
    // tabBarActiveTintColor: '#00ccbb',
    // tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      backgroundColor: colorScheme === "light" ? '#fff' : "#1e293b",
      // borderTopWidth: 1,
      borderTopColor: 'gray',
    },
    tabBarLabelStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    // tabBarIconStyle: {
    //   marginBottom: -3,
    // },
    headerShown: false,
    headerTitleStyle: {
      fontFamily: "CairoB",
      color: "white",
    },
    headerStyle: {
      elevation: 0, // Remove elevation/shadow on Android
      shadowOpacity: 0, // Remove shadow on iOS
    },
  };
  
  const HomeOption = {
    tabBarIcon: ({ color }) => 
      <MaterialCommunityIcons name="home" size={24} color={color} /> 
  }
  const FavoritesOption = {
    tabBarIcon: ({ color }) => 
    <MaterialIcons name="favorite" size={24} color={color} />,
    headerShown: true,
  }
  const SettingsOption = {
    tabBarIcon: ({ color }) => 
      <MaterialIcons name="settings" size={24} color={color} />,
      headerShown: true,
  }
  const MisbahaOption = {
    tabBarIcon: ({ color }) => 
      <MaterialCommunityIcons name="timer" size={24} color={color} />,
      headerShown: true,
  }
  const MorningOption = {
    tabBarIcon: ({ color }) => 
      <MaterialIcons name="wb-sunny" size={24} color={color} />,
      headerShown: true,
  }
  const AdkarOptions = {
    tabBarIcon: ({ color }) => 
      <Ionicons name="md-moon" size={24} color={color} />,
      headerShown: true,
  }
  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="الرئيسية" component={QuizStack} options={HomeOption}/>
      <Tab.Screen name="المفضلة" component={Favorites} options={FavoritesOption}/>
      <Tab.Screen name="المسبحة" component={Misbaha} options={MisbahaOption}/>
      <Tab.Screen name="الأذكار" component={MaterialTopTabs} options={AdkarOptions}/>
      <Tab.Screen name="الإعدادات" component={Settings} options={SettingsOption}/>
    </Tab.Navigator>
  )
}

export default BottomTabs