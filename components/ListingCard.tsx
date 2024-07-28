import React, { useMemo, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import MediaCard from './MediaCard';
import { Colors } from '@/constants/Colors';
import { formatPrice } from '@/utils/currency';
import { formatDateToCustomString } from '@/utils/date';
import { Listing } from '@/types/listing';

interface ListingCardProps {
  listing: Listing;
  selected?: boolean;
  onPress?: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onPress, selected = false }) => {
  const {
    name,
    address: { street },
    price,
    last_scraped,
  } = listing;

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selected]);

  const getListingDetails = (listing: Listing) => {
    let items = [];

    if (listing.beds) {
      items.push(`${listing.beds} beds`);
    }

    if (listing.bathrooms?.$numberDecimal) {
      let bathrooms = parseFloat(listing.bathrooms.$numberDecimal);
      items.push(`${bathrooms} baths`);
    }

    if (listing.guests_included.$numberDecimal) {
      let guests = parseFloat(listing.guests_included.$numberDecimal);
      items.push(`${guests} guests`);
    }

    return items.join(' / ');
  };

  const renderDescription = () => {
    const details = getListingDetails(listing);
    const formattedDate = formatDateToCustomString(new Date(last_scraped));
    const formattedPrice = formatPrice(price.$numberDecimal);

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.descriptionContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.price}>{formattedPrice}</Text>
            <Text style={styles.description}>{details}</Text>
          </View>
          <Text style={styles.address}>{street.toLocaleUpperCase()}</Text>
          <View style={styles.dateContainer}>
            <View style={styles.bullet} />
            <Text style={styles.listingDate}>{formattedDate}</Text>
          </View>
        </View>
      </View>
    );
  };

  const description = useMemo(() => renderDescription(), [listing]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, { opacity }]}>
        <MediaCard imageUrl={listing.images.picture_url} content={description} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  contentContainer: {
    marginLeft: 8,
  },
  name: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600',
    color: '#3D3D3D',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    color: '#5A5A5A',
  },
  description: {
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 17,
    color: '#5A5A5A',
  },
  address: {
    color: Colors.light.text_gray,
    lineHeight: 15,
    fontSize: 12,
    fontWeight: '400',
  },
  dateContainer: {
    marginLeft: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.light.red,
    marginRight: 4,
  },
  listingDate: {
    color: '#4A4A4A',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default ListingCard;
