import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import AuthProvider, { useAuth } from '@/providers/AuthProvider';
import SplashScreen from '@/components/SplashScreen';
import { useState } from 'react';

const queryClient = new QueryClient();

function InitialLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const { loading } = useAuth();
  useReactQueryDevTools(queryClient);


  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen 
          name="index"
        />
        <Stack.Screen
          name="(auth)/signin/index"
          options={{ 
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(auth)/signup/index"
          options={{ 
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      {(loading || !isAppReady) && (
        <SplashScreen
          onFinish={(isCancelled) => !isCancelled && setIsAppReady(true)}
        />
      )}
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    IcoMoon: require('../assets/fonts/icomoon.ttf'),
    Roboto: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </AuthProvider>
  );
}
