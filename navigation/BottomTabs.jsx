import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';

import { useColorScheme } from 'nativewind';
import QuizStack from './QuizStack';
import Test1 from '../screens/Test1';
import Test2 from '../screens/Test2';
import Notif from '../screens/Notif';

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

  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="الرئيسية" component={QuizStack} options={HomeOption}/>
      <Tab.Screen name="المفضلة" component={Favorites} options={FavoritesOption}/>
      <Tab.Screen name="الإعدادات" component={Settings} options={SettingsOption}/>
      <Tab.Screen name="t1" component={Test1} options={SettingsOption}/>
      <Tab.Screen name="t2" component={Test2} options={SettingsOption}/>
      <Tab.Screen name="notif" component={Notif} options={SettingsOption}/>
    </Tab.Navigator>
  )
}

export default BottomTabs