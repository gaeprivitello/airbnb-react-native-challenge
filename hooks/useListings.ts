import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Listing } from '@/types/listing';
import { useListingContext } from './useListingContext';
import { createMarkerFromListing } from '@/utils/listing';

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

const useListings = (search: string, limit: number = DEFAULT_LIMIT) => {
  const { listings, markers, setMarkers, setListings, selectedListing, setSelectedListing } =
    useListingContext();

  const [loadingMore, setLoadingMore] = useState(false);

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
      const newListings = data?.listings || [];
      const newMarkers = newListings.map((listing) => createMarkerFromListing(listing));

      setListings(newListings);
      setMarkers(newMarkers);
    }
  }, [data]);

  const loadMore = async (offset: number) => {
    if (!loadingMore) {
      setLoadingMore(true);
      const result = await fetchMore({
        variables: {
          input: {
            search,
            limit,
            skip: offset,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return { listings: fetchMoreResult.listings };
        },
      });

      const newMarkers = result.data.listings.map((listing) => createMarkerFromListing(listing));

      setListings([...listings, ...result.data.listings]);
      setMarkers([...markers, ...newMarkers]);
      setLoadingMore(false);
    }
  };

  return { loading, loadingMore, listings, markers, selectedListing, setSelectedListing, loadMore };
};

export default useListings;
