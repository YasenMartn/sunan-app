import "react-native-gesture-handler";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme } from "nativewind";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import Container from "./screens/Container";

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

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container/>
        </PersistGate>
      </Provider>
    </>
  );
}

