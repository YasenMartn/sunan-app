import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

const barStyle = {
  backgroundColor: '#fff', 
  borderTopWidth: 1,
  borderTopColor: 'gray', 
}

const homeOptions = {
  tabBarIcon: ({ color }) => 
    <MaterialCommunityIcons name="home" size={24} color={color} /> 
}
const premiumOptions = {
  tabBarIcon: ({ color }) => 
    <MaterialCommunityIcons name="crown" size={24} color={color} />
}

const MaterialBotTabs = () => {
  return (
    <Tab.Navigator barStyle={barStyle} activeColor="#00ccbb" inactiveColor="#3e2465">
      <Tab.Screen name="HomeBot" component={Home}  options={homeOptions}/>
      <Tab.Screen name="SettingsBot" component={Home} options={premiumOptions} />
      <Tab.Screen name="Sett" component={Home} options={homeOptions}/>
      <Tab.Screen name="Eve" component={Home} options={homeOptions}/>
    </Tab.Navigator>
  )
}

export default MaterialBotTabs;