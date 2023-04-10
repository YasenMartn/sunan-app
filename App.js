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

  const darkTheme = {
    dark: false,
    colors: {
      primary: '#00ccbb',
      background: '#00ccbb',
      card: '#00ccbb',
      text: '#fff',
      border: '#00ccbb',
      notification: '#00ccbb',
    },
  };

  return (
    <>
      <PaperProvider>
        <NavigationContainer theme={colorScheme === "dark" ? darkTheme : DefaultTheme}>
          <DrawerNav/>
        </NavigationContainer>
      </PaperProvider>
      <StatusBar style="light" backgroundColor="#00ccbb" />
    </>
  );
}

