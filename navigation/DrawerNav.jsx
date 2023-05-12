import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { FontAwesome } from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
import QuizStack from './QuizStack';
import { useColorScheme } from 'nativewind';


const Drawer = createDrawerNavigator();

const screenOptions = () => {
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
    drawerActiveBackgroundColor: "#3e8c84",
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
      <Drawer.Screen name="الصفحة الرئيسية" component={QuizStack} options={homeOptions}/>
    </Drawer.Navigator>
  )
}

export default DrawerNav