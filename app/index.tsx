import { useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';

import HomeLayoutProps from '@/components/HomeLayoutProps';
import MarkersMap from '@/components/MarkersMap';
import ListingCard from '@/components/ListingCard';
import SearchInput from '@/components/SearchInput';
import useListingMarkers from '@/hooks/useListingMarkers';

export default function Home() {
  const [search, setSearch] = useState('');

  const { loading, listings, markers, loadMore } = useListingMarkers(search);

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
          data={listings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ListingCard listing={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.25}
        />
      )}
    </HomeLayoutProps>
  );
}
