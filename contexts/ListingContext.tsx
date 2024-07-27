import { Listing } from '@/types/listing';
import React, { createContext, useReducer, ReactNode } from 'react';

enum ActionType {
  ADD_LISTINGS = 'ADD_LISTINGS',
  SET_SELECTED_LISTING = 'SET_SELECTED_LISTING',
}

type Action =
  | { type: ActionType.ADD_LISTINGS; listings: Listing[] }
  | { type: ActionType.SET_SELECTED_LISTING; listingId: string };

interface State {
  listings: { [key: string]: Listing };
  selectedListing?: Listing;
}

const initialState: State = {
  listings: {},
  selectedListing: undefined,
};

const listingReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_LISTINGS:
      const newListingMap = action.listings.reduce((acc, listing) => {
        acc[listing._id] = listing;
        return acc;
      }, {} as { [key: string]: Listing });
      return {
        ...state,
        listings: {
          ...state.listings,
          ...newListingMap,
        },
      };
    case ActionType.SET_SELECTED_LISTING:
      return {
        ...state,
        selectedListing: state.listings[action.listingId],
      };
    default:
      return state;
  }
};

interface ListingContextType {
  selectedListing?: Listing;
  listings: { [key: string]: Listing };
  addListings: (listings: Listing[]) => void;
  setSelectedListing: (listingId: string) => void;
}

export const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(listingReducer, initialState);

  const addListings = (listings: Listing[]) => {
    dispatch({ type: ActionType.ADD_LISTINGS, listings });
  };

  const setSelectedListing = (listingId: string) => {
    dispatch({ type: ActionType.SET_SELECTED_LISTING, listingId });
  };

  return (
    <ListingContext.Provider value={{ ...state, addListings, setSelectedListing }}>
      {children}
    </ListingContext.Provider>
  );
};
