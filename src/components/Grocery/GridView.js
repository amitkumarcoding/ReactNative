import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vegetables} from './data';
import ListView from './ListView';

const GridView = () => {
  const renderItem = ({item, index}) => {
    const {id, name, price, image, quantity, unit, selectedQuantity} = item;

    return <ListView imageUrl={image} />;
  };
  return (
    <FlatList
      data={vegetables}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      bounces={false}
      numColumns={2}
      contentContainerStyle={{gap: 10, paddingHorizontal: 16}}
    />
  );
};

export default GridView;

const styles = StyleSheet.create({});
