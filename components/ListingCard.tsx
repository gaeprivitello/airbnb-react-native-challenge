import React, { useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import MediaCard from './MediaCard';
import { Colors } from '@/constants/Colors';
import { formatPrice } from '@/utils/currency';
import { formatDateToCustomString } from '@/utils/date';
import { Listing } from '@/types/listing';
import { formatListingDetails } from '@/utils/listing';

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

  const details = useMemo(() => formatListingDetails(listing), [listing]);
  const formattedPrice = useMemo(() => formatPrice(price.$numberDecimal), [price]);
  const formattedDate = useMemo(
    () => formatDateToCustomString(new Date(last_scraped)),
    [last_scraped]
  );

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, { opacity }]}>
        <MediaCard
          imageUrl={listing.images.picture_url}
          title={
            <View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                {name}
              </Text>
            </View>
          }
          body={
            <View>
              <View style={styles.detailsContainer}>
                <Text style={styles.price}>{formattedPrice}</Text>
                <Text style={styles.description}>{details}</Text>
              </View>
              <Text style={styles.address}>{street.toLocaleUpperCase()}</Text>
            </View>
          }
          footer={
            <View style={styles.dateContainer}>
              <View style={styles.bullet} />
              <Text style={styles.listingDate}>{formattedDate}</Text>
            </View>
          }
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
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
    marginTop: 8,
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
