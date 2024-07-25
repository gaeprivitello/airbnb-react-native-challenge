import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 300;

interface MarkerPoint {
  lat: number
  lng: number
}

type MarkersMapProps = PropsWithChildren<{
  markers?: MarkerPoint[]
}>;

export default function MarkersMap({
  markers,
  children,
}: MarkersMapProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <MapView 
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          initialRegion={{
            latitude: 40.62857,
            longitude: -73.94071,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

        >
          {markers && (markers.map((marker, index) => (
            <Marker
            onPress={() => console.log('marker pressed',{marker})}
              key={index}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
              
            />
            
          )))}
        </MapView>
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
  map: {
    width: '100%',
    height: HEADER_HEIGHT,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
