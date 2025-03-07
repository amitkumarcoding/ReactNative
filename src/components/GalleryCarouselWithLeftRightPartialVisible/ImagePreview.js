import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {CloseIcon, RotateIcon} from '../../assets';
import Pinchable from 'react-native-pinchable';

const {width, height} = Dimensions.get('screen');

const _imageWidth = width * 0.8;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 16;

const ImagePreview = ({closePreview, selectedIndex = 0, data}) => {
  const [rotations, setRotations] = useState({});
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const rotateImage = () => {
    setRotations(prevRotations => ({
      ...prevRotations,
      [currentIndex]: (prevRotations[currentIndex] || 0) + 90,
    }));
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = useCallback(
    ({item, index}) => {
      const rotation = rotations[index] || 0;
      const isRotated = rotation % 180 !== 0;
      return (
        <View style={styles.imageContainer}>
          <Pinchable>
            <Image
              source={{uri: item}}
              style={styles.imageStyle(isRotated, rotation)}
            />
          </Pinchable>
        </View>
      );
    },
    [rotations],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: _imageWidth + _spacing,
      offset: (_imageWidth + _spacing) * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
        <CloseIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rotateButton} onPress={rotateImage}>
        <RotateIcon />
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={'fast'}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        initialScrollIndex={selectedIndex}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
      />
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000D0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  imageStyle: (isRotated, rotation) => ({
    transform: [{rotate: `${rotation}deg`}],
    resizeMode: isRotated ? 'contain' : 'cover',
    width: isRotated ? _imageWidth : _imageWidth,
    height: isRotated ? _imageWidth : _imageHeight,
    overflow: 'hidden',
    borderRadius: 16,
  }),
  imageContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
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
});
