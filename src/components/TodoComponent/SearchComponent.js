import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SearchIcon} from '../../assets';

const SearchComponent = ({onSearch}) => {
  const [input, setInput] = useState('');

  const onChangeText = val => {
    setInput(val);
    onSearch(val);
  };
  return (
    <View>
      <View style={styles.textInputContainer}>
        <SearchIcon />
        <TextInput
          value={input}
          placeholder="Search"
          placeholderTextColor="#777"
          onChangeText={onChangeText}
          style={styles.textInput}
        />
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  textInputContainer: {
    borderWidth: 1.5,
    borderColor: '#3E1671',
    marginLeft: 25,
    marginRight: 15,
    width: '88%',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 20,
  },
  textInput: {
    paddingLeft: 20,
    color: '#fff',
  },
});
