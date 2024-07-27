import { FlatList, ActivityIndicator, TextInput, View } from 'react-native';
import HomeLayoutProps from '@/components/HomeLayoutProps';

import { gql, useQuery } from '@apollo/client';
import { Listing } from '@/types/listing';
import MarkersMap from '@/components/MarkersMap';
import { useState } from 'react';
import ListingCard from '@/components/ListingCard';
import SearchInput from '@/components/SearchInput';

const LISTINGS_QUERY = gql`
  query listingsPageQuery($input: PageQueryInput) {
    listings: listingsPage(input: $input) {
      _id
      name
      address {
        street
        location {
          coordinates
        }
        suburb
      }
      guests_included
      bathrooms
      bedrooms
      beds
      images {
        picture_url
      }
      last_scraped
      listing_url
      price
    }
  }
`;

export default function Home() {
  const [search, setSearch] = useState('');

  const { loading, data } = useQuery<{ listings: Listing[] }>(LISTINGS_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        search: search,
        limit: 30,
      },
    },
  });

  let markers: { lat: number; lng: number }[] = [];

  if (data?.listings) {
    markers = data.listings.map((listing) => ({
      lat: listing.address.location.coordinates[1],
      lng: listing.address.location.coordinates[0],
    }));
  }

  console.log(markers.length);

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

      {!loading && data?.listings && (
        <FlatList
          data={data.listings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ListingCard listing={item} />}
          onEndReached={() => {
            console.log('End reached');
          }}
        />
      )}
    </HomeLayoutProps>
  );
}
