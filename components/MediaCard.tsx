import { Listing } from '@/types/listing';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MediaCardProps {
  imageUrl: string;

  content: React.ReactNode;
}

/**
 * TODO: This component needs to be extended in order to show the full information of a given listing
 */
const MediaCard: React.FC<MediaCardProps> = ({ imageUrl, content }) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={isError ? require('../assets/images/default-prop-img.jpeg') : { uri: imageUrl }}
        onError={handleImageError}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
  image: {
    width: 64,
    height: '100%',
    borderRadius: 4,
  },
});

export default MediaCard;
