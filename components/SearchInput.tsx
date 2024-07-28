import SearchIcon from '@/assets/icons/Search';
import React, { useMemo, useState, useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { debounce } from 'lodash';

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch }) => {
  const [innerSearch, setInnerSearch] = useState(search);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setInnerSearch(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search address, city, state, zip code"
        placeholderTextColor={'#6A6A6A'}
        value={innerSearch}
        onChangeText={handleSearch}
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
