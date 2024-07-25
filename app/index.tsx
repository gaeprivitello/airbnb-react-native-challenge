import {  FlatList, ActivityIndicator, TextInput, View } from 'react-native';
import HomeLayoutProps from '@/components/HomeLayoutProps';

import { gql, useQuery } from "@apollo/client";
import { Listing } from '@/types/listing';
import MarkersMap from '@/components/MarkersMap';
import MediaCard from '@/components/MediaCard';
import { useState } from 'react';

const LISTINGS_QUERY = gql`
query listingsPageQuery($input: PageQueryInput) {
  listings: listingsPage(input: $input) {
    _id
    address {
      street
      location {
        coordinates
      }
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
  const [search, setSearch] = useState("");

  const { loading, data } = useQuery<{ listings: Listing[] }>(LISTINGS_QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      input: {
        search: search,
        limit: 100
      }
    }
  });

  let markers: { lat: number, lng: number}[] = [];

  if (data?.listings) {
    markers = data.listings.map((listing) => ({
      lat: listing.address.location.coordinates[1],
      lng: listing.address.location.coordinates[0],
    }))
  }

  console.log(markers);

  return (
    <HomeLayoutProps
      header={
        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Search listings"
            value={search}
            onChangeText={setSearch}
          />
          <MarkersMap markers={markers} />
        </View>
      }>
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {!loading && data?.listings && (
        <FlatList
          data={data.listings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MediaCard listing={item}/>
          )}
        />
      )}
    </HomeLayoutProps>
  );
}
