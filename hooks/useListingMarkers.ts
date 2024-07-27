import { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Listing } from '@/types/listing';
import { MarkerPoint } from '@/types/marker-point';
import { useListingContext } from './useListingContext';

const DEFAULT_LIMIT = 50;

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

const useListingMarkers = (search: string, limit: number = DEFAULT_LIMIT) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [markers, setMarkers] = useState<MarkerPoint[]>([]);

  const { addListings } = useListingContext();

  const { loading, data, fetchMore } = useQuery<{ listings: Listing[] }>(LISTINGS_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        search,
        limit,
        skip: 0,
      },
    },
  });

  useEffect(() => {
    if (data?.listings) {
      setListings(data.listings);

      const newMarkers = data.listings.map((listing) => ({
        id: listing._id,
        lat: listing.address.location.coordinates[1],
        lng: listing.address.location.coordinates[0],
      }));
      setMarkers(newMarkers);
    }
  }, [data]);

  useEffect(() => {
    addListings(listings);
  }, [listings]);

  const loadMore = useCallback(() => {
    fetchMore({
      variables: {
        input: {
          search,
          limit,
          skip: listings.length,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const newListings = [...listings, ...fetchMoreResult.listings];

        const newMarkers = fetchMoreResult.listings.map((listing) => ({
          id: listing._id,
          lat: listing.address.location.coordinates[1],
          lng: listing.address.location.coordinates[0],
        }));

        setListings(newListings);
        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);

        return { listings: newListings };
      },
    });
  }, [fetchMore, listings.length, search, limit]);

  return { loading, listings, markers, loadMore };
};

export default useListingMarkers;
