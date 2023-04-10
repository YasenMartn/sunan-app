import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/Home';

const Tab = createMaterialTopTabNavigator();



const screenOptions = {
  tabBarActiveTintColor: 'white',
  // tabBarInactiveTintColor: 'gray',
  tabBarStyle: { backgroundColor: '#00ccbb' },
  tabBarIndicatorStyle: { backgroundColor: '#fff' },
};

const MTopTabsNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
      <Tab.Screen name="More" component={Home} />
      <Tab.Screen name="Info" component={Home} />
    </Tab.Navigator>
  )
}

export default MTopTabsNav