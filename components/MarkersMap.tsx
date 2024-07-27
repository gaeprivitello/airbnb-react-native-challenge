import { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';
import MarkerIcon from '@/assets/icons/Marker';
import { MarkerPoint } from '@/types/marker-point';
import { useListingContext } from '@/hooks/useListingContext';
import ListingMarker from './MarkerLabel';
import { formatPrice } from '@/utils/currency';

const defaultMapZoom = {
  latitudeDelta: 0.004,
  longitudeDelta: 0.004,
};

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

  const { selectedListing, setSelectedListing } = useListingContext();

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
  }, [markers, mapRef.current]);

  useEffect(() => {
    if (selectedListing) {
      mapRef.current?.animateToRegion(
        {
          latitude: selectedListing.address.location.coordinates[1],
          longitude: selectedListing.address.location.coordinates[0],
          ...defaultMapZoom,
        },
        600
      );
    }
  }, [selectedListing]);

  const handleMarkerPress = (point: MarkerPoint) => {
    setSelectedListing(point.id);
    animateToMarker(point);
  };

  const animateToMarker = (point: MarkerPoint) => {
    mapRef.current?.animateToRegion(
      {
        latitude: point.lat,
        longitude: point.lng,
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
              latitude: marker.lat,
              longitude: marker.lng,
            }}
          >
            {selectedListing?._id === marker.id && (
              <ListingMarker label={`${[formatPrice(selectedListing?.price.$numberDecimal)]}`} />
            )}
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
