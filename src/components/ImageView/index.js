import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState, useRef, useMemo } from 'react';
import { metaData } from '../../screens/CarouselBackgroundAnimation/data';
import ImagePreview from './ImagePreview';

const ImageView = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const flatListRef = useRef(null);

  const handlePreview = (index = null) => setSelectedIndex(index);

  const renderItem = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handlePreview(index)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item }} style={styles.imageStyle} />
      </TouchableOpacity>
    ),
    []
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList
        horizontal
        data={metaData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
      />
      {selectedIndex !== null && (
        <ImagePreview
          data={metaData}
          flatListRef={flatListRef}
          selectedIndex={selectedIndex}
          closePreview={() => handlePreview(null)}
        />
      )}
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  imageStyle: {
    width: 250,
    height: 400,
    borderRadius: 14,
  },
  contentContainerStyle: {
    gap: 24,
    paddingHorizontal: 24,
  },
});
