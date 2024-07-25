import type { PropsWithChildren, ReactElement } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 300;

type HomeLayoutProps = PropsWithChildren<{
  header: ReactElement;
}>;

export default function HomeLayout({
  header,
  children,
}: HomeLayoutProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        {header}
      </View>
      <View style={styles.content}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    overflow: 'hidden',
  },
});
