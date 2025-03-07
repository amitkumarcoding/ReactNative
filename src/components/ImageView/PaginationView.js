import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';

const PaginationView = ({data = [], currentIndex, onPress}) => {
  const renderItem = useCallback(
    ({_, index}) => {
      return (
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          onPress={() => onPress(index)}
          style={styles.container(index, currentIndex)}
        />
      );
    },
    [currentIndex, data, onPress],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      contentContainerStyle={styles.contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      style={{
        position: 'absolute',
        bottom: 82,
      }}
    />
  );
};

export default PaginationView;

const styles = StyleSheet.create({
  container: (index, currentIndex) => ({
    width: index === currentIndex ? 12 : 8,
    height: index === currentIndex ? 12 : 8,
    backgroundColor: index === currentIndex ? '#fff' : '#888',
    borderRadius: index === currentIndex ? 6 : 4,
    alignSelf: 'center',
  }),
  contentContainerStyle: {
    gap: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  hitSlop: {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  },
});
