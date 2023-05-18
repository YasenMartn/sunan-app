import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DrawerNav from './navigation/DrawerNav';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from "nativewind";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import store from "./redux/store";
import { Provider } from "react-redux";
import QuizStack from "./navigation/QuizStack";

SplashScreen.preventAutoHideAsync();
let persistor = persistStore(store);


export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const { colorScheme, setColorScheme } = useColorScheme();

  NavigationBar.setBackgroundColorAsync(colorScheme === "light" ? "#fff" : "#0b141b");
  NavigationBar.setButtonStyleAsync(colorScheme === "light" ? "dark" : "light");

  // 0d6efd blue

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          CairoB: require("./assets/fonts/Cairo-Bold-3.ttf"),
          CairoR: require("./assets/fonts/Cairo-Regular-1.ttf"),
          T: require("./assets/fonts/T.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  onLayoutRootView();

  if (!appIsReady) {
    return null;
  }

  const color = "#3e8c84" 


  const lightTheme = {
    dark: false,
    colors: {
      // primary: '#4B0082',
      background: '#fff',
      card: color, //header color
      // text: '#000',
      // border: '#4B0082',
      // notification: '#00ccbb',
    },
  };

  //ff7f50

  const darkTheme = {
    dark: false,
    colors: {
      // primary: '#4B0082',
      background: '#1e293b',
      card: color, //header color
      // text: '#fff',
      // border: '#4B0082',
      // notification: '#4B0082',
    },
  };

  return (
    <>
      <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={colorScheme === "dark" ? darkTheme : lightTheme}>
          <DrawerNav/>
          {/* <QuizStack/> */}
        </NavigationContainer>
        </PersistGate>
      </Provider>
      </PaperProvider>
      <StatusBar style="light" backgroundColor={color} />
    </>
  );
}

