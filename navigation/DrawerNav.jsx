import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { FontAwesome } from '@expo/vector-icons';
import MTopTabsNav from './MTopTabsNav';
import MaterialBotTabs from './MaterialBotTabs';
import BottomTabs from './BottomTabs';
import CustomDrawer from '../components/CustomDrawer';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import PrayerStack from './PrayerStack';
import { useColorScheme } from 'nativewind';


const Drawer = createDrawerNavigator();

const screenOptions = ({navigation}) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  return {
    headerStyle: {
      backgroundColor: "#00ccbb",
      elevation: 0
    },
    headerTintColor: "white", //header color icon & text
    headerTitleAlign: 'center',
    headerTitle: "تطبيق الصلاة",
    headerTitleStyle: {
      fontFamily: "CairoB",
    },
    drawerActiveBackgroundColor: colorScheme === "dark" ? "#A68DF6" : "#ac7ef8",
    drawerActiveTintColor: "white", 
    // drawerInactiveTintColor: "black", 
    drawerPosition: "right",
    drawerLabelStyle: {
      fontFamily: "CairoB",
      marginRight: 12,
    },
    // headerRight: () => (
    //   <MaterialIcons name="menu" size={24} color="white" style={{marginRight: 15}} 
    //     onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
    //   />
    // ),
    // headerLeftContainerStyle: { display: 'none' },  
    headerShown: false,
  }
}

const homeOptions = {  
  drawerIcon: ({color}) => (
  <FontAwesome name="home" size={24} color={color} 
    style={{alignSelf: "center", position: "absolute", right: 10}} 
  />),
}

const DrawerNav = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptions} drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="الصفحة الرئيسية" component={PrayerStack} options={homeOptions}/>
      {/* <Drawer.Screen name="Material Top" component={MTopTabsNav} options={homeOptions}/>
      <Drawer.Screen name="Material Bot" component={MaterialBotTabs} options={homeOptions}/>
      <Drawer.Screen name="BottomTabs" component={BottomTabs} options={homeOptions}/> */}
    </Drawer.Navigator>
  )
}

export default DrawerNav