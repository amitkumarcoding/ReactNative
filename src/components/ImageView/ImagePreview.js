import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {CloseIcon, RotateIcon} from '../../assets';
import PaginationView from './PaginationView';

const ImagePreview = ({flatListRef, data, selectedIndex, closePreview}) => {
  const {width, height} = useWindowDimensions();
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);
  const [rotationMap, setRotationMap] = useState({});

  const rotateImage = () => {
    setRotationMap(prev => ({
      ...prev,
      [currentIndex]: prev[currentIndex] === 90 ? 0 : 90,
    }));
  };

  const renderItem = useCallback(
    ({item, index}) => {
      const rotation = rotationMap[index] || 0;
      return (
        <View key={index} style={styles.imageContainer(width, height)}>
          <Image
            source={{uri: item}}
            style={styles.image(width, height, rotation)}
          />
        </View>
      );
    },
    [rotationMap],
  );

  const onMomentumScrollEnd = useCallback(
    event => {
      const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(newIndex);
    },
    [width],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  const handlePress = newIndex => {
    setCurrentIndex(newIndex);
    listRef.current?.scrollToIndex({index: newIndex, animated: true});
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
        <CloseIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rotateButton} onPress={rotateImage}>
        <RotateIcon />
      </TouchableOpacity>

      <Text style={styles.indicatorText}>
        {`${currentIndex + 1} / ${data.length}`}
      </Text>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        scrollEnabled={data.length > 0}
        keyExtractor={(_, index) => index.toString()}
        initialScrollIndex={selectedIndex}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <PaginationView
        data={data}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onPress={handlePress}
      />
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  imageContainer: (width, height) => ({
    width: width - 40,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  }),

  modalContainer: {
    flex: 1,
    backgroundColor: '#000000D0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  image: (width, height, rotation) => ({
    width: rotation % 180 === 0 ? width - 40 : height - 340,
    height: rotation % 180 === 0 ? height - 340 : width - 40,
    resizeMode: rotation % 180 === 0 ? 'cover' : 'contain',
    transform: [{rotate: `${rotation}deg`}],
    borderRadius: 14,
  }),
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    zIndex: 10,
  },
  rotateButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },

  indicatorText: {
    position: 'absolute',
    top: 80,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
