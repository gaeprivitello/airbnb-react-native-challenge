import { useEffect, useRef, useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';

import HomeLayoutProps from '@/components/HomeLayoutProps';
import MarkersMap from '@/components/MarkersMap';
import ListingCard from '@/components/ListingCard';
import SearchInput from '@/components/SearchInput';
import useListingMarkers from '@/hooks/useListingMarkers';
import { useListingContext } from '@/hooks/useListingContext';
import ListingModal from '@/components/ListingModal';

export default function Home() {
  const [search, setSearch] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const { loading, listings, markers, loadMore } = useListingMarkers(search);
  const { selectedListing, setSelectedListing } = useListingContext();

  useEffect(() => {
    if (selectedListing) {
      flatListRef.current?.scrollToIndex({
        index: listings.findIndex((item) => item._id === selectedListing._id),
        animated: true,
      });
    }
  }, [selectedListing]);

  return (
    <HomeLayoutProps
      header={
        <View style={{ flex: 1 }}>
          <SearchInput search={search} setSearch={setSearch} />
          <MarkersMap markers={markers} />
        </View>
      }
    >
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {!loading && listings && (
        <FlatList
          ref={flatListRef}
          data={listings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ListingCard
              listing={item}
              selected={selectedListing?._id === item._id}
              onPress={() => setSelectedListing(item._id)}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.25}
        />
      )}
    </HomeLayoutProps>
  );
}
