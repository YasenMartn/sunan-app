import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { FontAwesome } from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
import QuizStack from './QuizStack';
import BottomTabs from './BottomTabs';
import Settings from '../screens/Settings';
import { useSelector } from 'react-redux';


const Drawer = createDrawerNavigator();


const homeOptions = {  
  drawerIcon: ({color}) => (
  <FontAwesome name="home" size={24} color={color} 
    style={{alignSelf: "center", position: "absolute", right: 10}} 
  />),
}

const DrawerNav = () => {

  const color = useSelector(state => state.app.themeColor.background)


  const screenOptions = () => {
    return {
      headerStyle: {
        // backgroundColor: "#3b82f6",
        elevation: 0
      },
      headerTintColor: "white", //header color icon & text
      headerTitleAlign: 'center',
      headerTitle: "تطبيق الصلاة",
      headerTitleStyle: {
        fontFamily: "CairoB",
      },
      drawerActiveBackgroundColor: color,
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

  
  return (
    <Drawer.Navigator screenOptions={screenOptions} drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="e" component={BottomTabs} options={homeOptions}/>
      <Drawer.Screen name="الصفحة الرئيسية" component={QuizStack} options={homeOptions}/>
      <Drawer.Screen name="settings" component={Settings} options={homeOptions}/>
    </Drawer.Navigator>
  )
}

export default DrawerNav