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

SplashScreen.preventAutoHideAsync();
NavigationBar.setBackgroundColorAsync("#fff");
NavigationBar.setButtonStyleAsync("dark");



export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          CairoB: require("./assets/fonts/Cairo-Bold-3.ttf"),
          CairoR: require("./assets/fonts/Cairo-Regular-1.ttf"),
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

  const lightTheme = {
    dark: false,
    colors: {
      primary: '#4B0082',
      background: '#4B0082',
      card: '#005F5E', //header color
      text: '#fff',
      border: '#4B0082',
      notification: '#00ccbb',
    },
  };

  const darkTheme = {
    dark: false,
    colors: {
      primary: '#4B0082',
      background: '#4B0082',
      card: '#ac7ef8', //header color
      text: '#fff',
      border: '#4B0082',
      notification: '#4B0082',
    },
  };

  return (
    <>
      <PaperProvider>
        <NavigationContainer theme={colorScheme === "dark" ? darkTheme : lightTheme}>
          <DrawerNav/>
        </NavigationContainer>
      </PaperProvider>
      <StatusBar style="light" backgroundColor={colorScheme === "dark" ? "#005F5E" : "#005F5E"} />
    </>
  );
}

