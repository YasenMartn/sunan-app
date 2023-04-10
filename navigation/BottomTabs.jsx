import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarActiveTintColor: '#00ccbb',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  // tabBarLabelStyle: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  // },
  // tabBarIconStyle: {
  //   marginBottom: -3,
  // },
};

const homeOptions = {
  tabBarIcon: ({ color }) => 
    <MaterialCommunityIcons name="home" size={24} color={color} /> 
}
const premiumOptions = {
  tabBarIcon: ({ color }) => 
    <MaterialCommunityIcons name="crown" size={24} color={color} />
}

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} options={homeOptions}/>
      <Tab.Screen name="Premium" component={Home} options={premiumOptions}/>
      <Tab.Screen name="Nice" component={Home} options={homeOptions}/>
      <Tab.Screen name="Settings" component={Home} options={premiumOptions}/>
    </Tab.Navigator>
  )
}

export default BottomTabs