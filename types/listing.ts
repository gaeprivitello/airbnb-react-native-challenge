export interface Address {
  street: string;
  location: {
    coordinates: number[]
  }
  __typename: string;
}

export interface GuestsIncluded {
  $numberDecimal: string;
}

export interface Bathrooms {
  $numberDecimal: string;
}

export interface Price {
  $numberDecimal: string;
}

export interface Images {
  picture_url: string;
  __typename: string;
}

export interface Listing {
  _id: string;
  address: Address;
  guests_included: GuestsIncluded;
  bathrooms: Bathrooms;
  bedrooms: number;
  beds: number;
  images: Images;
  last_scraped: string;
  listing_url: string;
  price: Price;
  __typename: string;
}