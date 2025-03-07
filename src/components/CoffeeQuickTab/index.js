import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COFFEE_DATA} from './data';
import {Colors} from '../../config/styles';

const CoffeeQuickTab = () => {
  const [selectedText, setSelectedText] = useState('All Coffee');

  const onItemPress = val => {
    setSelectedText(val);
  };

  const renderItem = ({item}) => {
    const {text} = item;

    return (
      <TouchableOpacity
        onPress={() => onItemPress(text)}
        style={[
          styles.banner,
          selectedText === text ? styles.selectedStyle : styles.deSelectedStyle,
        ]}>
        <Text
          style={[
            styles.textStyle,
            selectedText === text ? styles.selectedText : styles.deSelectedText,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={COFFEE_DATA}
        extraData={COFFEE_DATA}
        renderItem={renderItem}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CoffeeQuickTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    paddingHorizontal: 20,
  },
  banner: {
    height: 30,
    marginRight: 12,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  selectedStyle: {
    backgroundColor: '#C67C4E',
  },
  textStyle: {
    fontSize: 14,
  },
  deSelectedStyle: {
    backgroundColor: '#EDEDED',
  },
  selectedText: {
    color: Colors.COLOR_FFFFFF,
  },
  deSelectedText: {
    color: Colors.COLOR_000000,
  },
});
