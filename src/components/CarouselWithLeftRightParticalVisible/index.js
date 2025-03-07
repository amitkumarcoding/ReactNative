import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {metaData} from '../../screens/CarouselBackgroundAnimation/data';

const {width} = Dimensions.get('screen');

const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12;

const CarouselWithLeftRightPartialVisible = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={metaData}
        renderItem={(item, index) => <Photo item={item} index={index} />}
        horizontal
        style={{flexGrow: 0}}
        pagingEnabled
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={'fast'}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CarouselWithLeftRightPartialVisible;

const Photo = ({item, index}) => {
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: 'hidden',
        borderRadius: 16,
      }}>
      <Image source={{uri: item.item}} style={{flex: 1, resizeMode: 'cover'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
