import { useEffect, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';
import MarkerIcon from '@/assets/icons/Marker';

interface MarkerPoint {
  lat: number;
  lng: number;
}

type MarkersMapProps = {
  markers?: MarkerPoint[];
};

const defaultRegion: Region = {
  latitude: 40.62857,
  longitude: -73.94071,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MarkersMap({ markers = [] }: MarkersMapProps) {
  const mapRef = useRef<MapView>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (markers.length === 0 || !mapRef.current) {
      return;
    }

    mapRef.current.fitToCoordinates(
      markers.map((marker) => ({ latitude: marker.lat, longitude: marker.lng })),
      {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
        animated: true,
      }
    );

    initRef.current = true;
  }, [markers, mapRef.current]);

  const handlePress = (point: MarkerPoint) => {
    mapRef.current?.animateToRegion(
      {
        latitude: point.lat,
        longitude: point.lng,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      },
      500
    );
  };

  return (
    <ThemedView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        region={defaultRegion}
      >
        {markers.map((marker, index) => (
          <Marker
            onPress={() => handlePress(marker)}
            key={index}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
          >
            <MarkerIcon />
          </Marker>
        ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    flex: 1,
    backgroundColor: 'red',
  },
  map: {
    flex: 1,
  },
});
