import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Home from '../screens/Home';
import MultipleChoice from '../screens/MultipleChoice';
import Score from '../screens/Score';
import { resetScore } from '../redux/Slice';
import Tests from '../screens/Tests';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const QuizStack = () => {

  const dispatch = useDispatch();

  const screenOptions = ({ navigation }) => ({
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
    // headerMode: "float",
    headerLeft: () => (
      <MaterialIcons
        name="delete"
        size={24}
        color="white"
        style={{ marginLeft: 15 }}
        onPress={createAlert}
      />
    ),
    // headerTitle: 'أسئلة في الإسلام',
    // header: (props) => <CustomHeader {...props} />
  });

  const createAlert = () =>
    Alert.alert('', 'إعادة تعيين النتيجة لجميع الإختبارات ؟', [
      {
        text: 'لا',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'نعم', onPress: () => dispatch(resetScore()) },
    ]);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="أسئلة في الإسلام" component={Home} />
      <Stack.Screen name="Tests" component={Tests} />
      <Stack.Screen name="Exercise" component={MultipleChoice} />
      <Stack.Screen name="النتيجة" component={Score} />
    </Stack.Navigator>
  );
};

export default QuizStack;
