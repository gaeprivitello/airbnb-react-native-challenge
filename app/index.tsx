import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import HomeLayoutProps from '@/components/HomeLayoutProps';
import MarkersMap from '@/components/MarkersMap';
import ListingCard from '@/components/ListingCard';
import SearchInput from '@/components/SearchInput';
import useListings from '@/hooks/useListings';
import { debounce } from 'lodash';

export default function Home() {
  const [search, setSearch] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const { loading, loadingMore, listings, markers, selectedListing, setSelectedListing, loadMore } =
    useListings(search);

  useEffect(() => {
    if (selectedListing) {
      const selectedIndex = listings.findIndex((item) => item._id === selectedListing._id);

      if (selectedIndex === -1) {
        setSelectedListing(null);
        return;
      }

      flatListRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
    }
  }, [selectedListing]);

  const handleFetchMore = useCallback(() => {
    if (loading || loadingMore) {
      return;
    }
    loadMore(listings.length);
  }, [loading, loadingMore, loadMore, listings.length]);

  const debounceFetchMore = useMemo(() => debounce(handleFetchMore, 300), [handleFetchMore]);

  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparator} />, []);

  return (
    <HomeLayoutProps
      header={
        <View style={{ flex: 1 }}>
          <SearchInput search={search} setSearch={setSearch} />
          <MarkersMap markers={markers} />
        </View>
      }
    >
      {loading && <ActivityIndicator size="small" color="#0000ff" />}

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
        ItemSeparatorComponent={itemSeparatorComponent}
        onEndReached={debounceFetchMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={15}
        removeClippedSubviews={true}
      />

      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
    </HomeLayoutProps>
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    marginVertical: 14,
  },
});
