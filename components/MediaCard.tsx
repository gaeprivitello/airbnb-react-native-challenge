import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface MediaCardProps {
  imageUrl: string;
  title: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const MediaCard: React.FC<MediaCardProps> = ({ imageUrl, title, body, footer }) => {
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
      <View style={styles.container}>
        <View>{title}</View>
        <View>{body}</View>
        <View>{footer}</View>
      </View>
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
  container: {
    flex: 1,
    gap: 8,
    marginLeft: 8,
  },
});

export default MediaCard;
