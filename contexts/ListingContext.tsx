import { Listing } from '@/types/listing';
import { MarkerPoint } from '@/types/marker-point';
import { createMarkerFromListing } from '@/utils/listing';

import { createContext, useReducer, ReactNode } from 'react';

enum ActionType {
  SET_MARKERS = 'SET_MARKERS',
  SET_LISTINGS = 'SET_LISTINGS',
  SET_SELECTED_LISTING = 'SET_SELECTED_LISTING',
  SET_SELECTED_MARKER = 'SET_SELECTED_MARKER',
}

type Action =
  | { type: ActionType.SET_MARKERS; markers: MarkerPoint[] }
  | { type: ActionType.SET_SELECTED_MARKER; marker: MarkerPoint }
  | { type: ActionType.SET_LISTINGS; listings: Listing[] }
  | { type: ActionType.SET_SELECTED_LISTING; listingId: string | null };

interface State {
  markers: MarkerPoint[];
  listings: Listing[];
  listingDict?: { [key: string]: Listing };
  selectedMarker?: MarkerPoint;
  selectedListing?: Listing;
}

const initialState: State = {
  markers: [],
  listings: [],
  listingDict: {},
  selectedMarker: undefined,
  selectedListing: undefined,
};

const listingReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_MARKERS:
      return {
        ...state,
        markers: action.markers,
      };
    case ActionType.SET_LISTINGS:
      const listingDict = action.listings.reduce((acc, listing) => {
        acc[listing._id] = listing;
        return acc;
      }, {} as { [key: string]: Listing });
      return {
        ...state,
        listings: action.listings,
        listingDict,
      };
    case ActionType.SET_SELECTED_MARKER:
      return {
        ...state,
        selectedMarker: action.marker,
      };
    case ActionType.SET_SELECTED_LISTING:
      const selectedListing = action.listingId ? state.listingDict?.[action.listingId] : undefined;

      const selectedMarker = selectedListing ? createMarkerFromListing(selectedListing) : undefined;
      return {
        ...state,
        selectedListing,
        selectedMarker,
      };
    default:
      return state;
  }
};

interface ListingContextType {
  selectedListing?: Listing;
  selectedMarker?: MarkerPoint;
  markers: MarkerPoint[];
  listings: Listing[];
  listingDict?: { [key: string]: Listing };
  setMarkers: (markers: MarkerPoint[]) => void;
  setListings: (listings: Listing[]) => void;
  setSelectedListing: (listingId: string | null) => void;
  setSelectedMarker: (marker: MarkerPoint) => void;
}

export const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(listingReducer, initialState);

  const setMarkers = (markers: MarkerPoint[]) => {
    dispatch({ type: ActionType.SET_MARKERS, markers });
  };

  const setListings = (listings: Listing[]) => {
    dispatch({ type: ActionType.SET_LISTINGS, listings });
  };

  const setSelectedListing = (listingId: string | null) => {
    dispatch({ type: ActionType.SET_SELECTED_LISTING, listingId });
  };

  const setSelectedMarker = (marker: MarkerPoint) => {
    setSelectedListing(marker.metadata?.id ?? null);
    dispatch({ type: ActionType.SET_SELECTED_MARKER, marker });
  };

  return (
    <ListingContext.Provider
      value={{
        ...state,
        setMarkers,
        setListings,
        setSelectedListing,
        setSelectedMarker,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
