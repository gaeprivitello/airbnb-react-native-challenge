import { StyleSheet, Text, View } from 'react-native';

interface ListingMarkerProps {
  label: string;
}

export default function MarkerLabel({ label }: ListingMarkerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 4,
    top: -25,
    backgroundColor: '#B5425C',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxHeight: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    width: '100%',
    color: 'white',
    textAlign: 'center',
  },
});
