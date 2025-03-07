import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {metaData} from '../../screens/CarouselBackgroundAnimation/data';

const GalleryView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef(null);
  const thumbRef = useRef(null);

  const {width, height} = useWindowDimensions();
  const IMAGE_SIZE = 80;
  const SPACING = 10;

  const fullScreenRenderItem = useCallback(
    ({item}) => (
      <View style={{width, height}}>
        <Image source={{uri: item}} style={styles.fullScreenImage} />
      </View>
    ),
    [],
  );

  const thumbnailContentRenderItem = useCallback(
    ({item, index}) => {
      const isActive = activeIndex === index;

      return (
        <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
          <Image
            source={{uri: item}}
            style={[styles.thumbnailImage(IMAGE_SIZE, SPACING, isActive)]}
          />
        </TouchableOpacity>
      );
    },
    [activeIndex],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const onMomentumScrollEnd = useCallback(
    event => {
      const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      scrollToActiveIndex(newIndex);
    },
    [width],
  );

  const scrollToActiveIndex = index => {
    setActiveIndex(index);

    topRef.current?.scrollToOffset?.({
      offset: index * width,
      animated: true,
    });

    const thumbnailOffset =
      index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2;

    thumbRef.current?.scrollToOffset?.({
      offset: Math.max(thumbnailOffset, 0),
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        data={metaData}
        renderItem={fullScreenRenderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <FlatList
        ref={thumbRef}
        data={metaData}
        renderItem={thumbnailContentRenderItem}
        keyExtractor={keyExtractor}
        horizontal
        contentContainerStyle={styles.thumbnailContainer}
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailList(IMAGE_SIZE)}
      />
    </View>
  );
};

export default GalleryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreenImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  thumbnailImage: (IMAGE_SIZE, SPACING, isActive) => ({
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginRight: SPACING,
    borderWidth: 2,
    resizeMode: 'cover',
    borderColor: isActive ? '#fff' : 'transparent',
  }),
  thumbnailContainer: {
    paddingHorizontal: 10,
  },
  thumbnailList: IMAGE_SIZE => ({
    position: 'absolute',
    bottom: IMAGE_SIZE,
  }),
});
