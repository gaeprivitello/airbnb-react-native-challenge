import { useContext } from 'react';
import { ListingContext } from '@/contexts/ListingContext';

export const useListingContext = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error('useListingContext must be used within a ListingProvider');
  }
  return context;
};
