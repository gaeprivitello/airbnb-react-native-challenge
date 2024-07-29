import { useEffect, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';
import MarkerIcon from '@/assets/icons/Marker';
import { MarkerPoint } from '@/types/marker-point';
import { useListingContext } from '@/hooks/useListingContext';

const defaultMapZoom = {
  latitudeDelta: 0.004,
  longitudeDelta: 0.004,
};

const defaultRegion: Region = {
  latitude: 40.62857,
  longitude: -73.94071,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

type MarkersMapProps = {
  markers?: MarkerPoint[];
};

export default function MarkersMap({ markers = [] }: MarkersMapProps) {
  const mapRef = useRef<MapView>(null);

  const { selectedMarker, setSelectedMarker } = useListingContext();

  useEffect(() => {
    if (markers.length === 0 || !mapRef.current || selectedMarker) {
      return;
    }

    mapRef.current.fitToCoordinates(
      markers.map((marker) => ({ latitude: marker.latitude, longitude: marker.longitude })),
      {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
        animated: true,
      }
    );
  }, [markers, mapRef.current]);

  useEffect(() => {
    if (selectedMarker) {
      mapRef.current?.animateToRegion(
        {
          latitude: selectedMarker.latitude,
          longitude: selectedMarker.longitude,
          ...defaultMapZoom,
        },
        600
      );
    }
  }, [selectedMarker]);

  const handleMarkerPress = (point: MarkerPoint) => {
    setSelectedMarker(point);
    animateToMarker(point);
  };

  const animateToMarker = (point: MarkerPoint) => {
    mapRef.current?.animateToRegion(
      {
        latitude: point.latitude,
        longitude: point.longitude,
        ...defaultMapZoom,
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
            onPress={() => handleMarkerPress(marker)}
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            {selectedMarker?.metadata?.id === marker.metadata?.id &&
              selectedMarker?.metadata?.popupContent}
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
