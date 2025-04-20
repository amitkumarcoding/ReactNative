import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {data} from './data';
import {HarryPotterHeaderComponent} from '../HarryPotterUI';

const TopView = () => {
  const renderItem = ({item, index}) => {
    return <Image key={index} source={item.images} style={styles.image} />;
  };
  return (
    <FlatList
      ListHeaderComponent={<HarryPotterHeaderComponent />}
      data={data}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={<View style={{marginVertical: 6}} />}
      // contentContainerStyle={{backgroundColor: 'red',}}
    />
  );
};

export default TopView;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    marginRight: 10,
    borderRadius: 8,
  },
});
