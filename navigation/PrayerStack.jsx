import { createStackNavigator } from '@react-navigation/stack';
import Details from '../screens/Details';
import Home from '../screens/Home';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator();

const screenOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: '#00ccbb',
  },
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: "CairoB",
  },
  headerRight: () => (
    <MaterialIcons name="menu" size={24} color="white" style={{marginRight: 15}} 
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
    />
  ),
})

const PrayerStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="تطبيق الصلاة" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}

export default PrayerStack