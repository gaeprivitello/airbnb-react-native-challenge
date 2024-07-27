import SearchIcon from '@/assets/icons/Search';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch }) => {
  const [innerSearch, setInnerSearch] = useState(search);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setSearch(innerSearch);
    }, 500);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [innerSearch, setSearch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search address, city, state, zip code"
        placeholderTextColor={'#6A6A6A'}
        value={innerSearch}
        onChangeText={setInnerSearch}
      />
      <SearchIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderColor: '#C2C5C8',
    borderWidth: 1.5,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchInput;
