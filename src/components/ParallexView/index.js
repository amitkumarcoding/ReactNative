import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {metaData} from '../../screens/CarouselBackgroundAnimation/data';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12;

const ParallaxView = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={metaData}
        renderItem={({item, index}) => (
          <Photo item={item} index={index} scrollX={scrollX} />
        )}
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
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />
    </View>
  );
};

export default ParallaxView;

const Photo = ({item, index, scrollX}) => {
  const styleZ = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.4, 1, 1.4],
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [5, 0, 5],
          )}deg`,
        },
      ],
    };
  });
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: 'hidden',
        borderRadius: 16,
      }}>
      <Animated.Image source={{uri: item}} style={[{flex: 1}, styleZ]} />
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
