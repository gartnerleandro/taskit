import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import AuthProvider, { useAuth } from '@/providers/AuthProvider';

// Evita que la pantalla inicial se oculte hasta que las fuentes estén cargadas.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading } = useAuth();
  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && loading) {
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
              name="(auth)/signin/index"
              options={{ headerShown: false, animation: "none", gestureEnabled: false }}
            />
            <Stack.Screen
              name="(auth)/signup/index"
              options={{ headerShown: false, animation: "none", gestureEnabled: false }}
            />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
