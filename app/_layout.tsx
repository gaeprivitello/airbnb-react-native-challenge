import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import ApolloProvider from '@/lib/graphql/apollo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListingProvider } from '@/contexts/ListingContext';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const headerNull = {
  header: () => null,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ApolloProvider>
      <StatusBar style="dark" />
      <ThemeProvider value={theme}>
        <ListingProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={headerNull}>
              <Stack.Screen name="index" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaView>
        </ListingProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
