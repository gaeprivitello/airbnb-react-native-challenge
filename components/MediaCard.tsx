import { Listing } from '@/types/listing';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MediaCardProps {
  listing: Listing;
}

/**
 * TODO: This component needs to be extended in order to show the full information of a given listing
 */
const MediaCard: React.FC<MediaCardProps> = ({ listing }) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <View style={styles.card}>
      <Image 
        style={styles.image}
        source={isError 
          ? require('../assets/images/default-prop-img.jpeg')
          : { uri: listing.images.picture_url }
        }
        onError={handleImageError}
      />
      <View>
        <Text>{listing.address.street}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // TODO: Implement this
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default MediaCard;

