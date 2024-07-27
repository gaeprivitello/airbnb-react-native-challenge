import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

type HomeLayoutProps = PropsWithChildren<{
  header: ReactElement;
}>;

export default function HomeLayout({ header, children }: HomeLayoutProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>{header}</View>
      <View style={styles.content}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 16,
  },
  header: {
    flex: 0.4,
  },
  content: {
    flex: 0.6,
  },
});
