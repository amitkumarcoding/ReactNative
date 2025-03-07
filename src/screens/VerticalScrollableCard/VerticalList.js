import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const VerticalList = ({data = []}) => {
  const {height} = Dimensions.get('screen');
  const spacing = 8;
  const itemSize = height * 0.72;
  const itemFullSize = itemSize + spacing * 2;
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y / itemFullSize;
  });

  const AnimationCard = ({item, index, scrollY}) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [index - 1, index, index + 1],
          [0.3, 1, 0.3],
        ),
        transform: [
          {
            scale: interpolate(
              scrollY.value,
              [index - 1, index, index + 1],
              [0.92, 1, 0.92],
            ),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {height: itemSize, padding: spacing * 2},
          animatedStyle,
        ]}>
        <Image
          source={{uri: item.thumbnailUrl}}
          style={[StyleSheet.absoluteFill, styles.backgroundImage]}
          blurRadius={80}
        />

        <Image
          source={{uri: item.thumbnailUrl}}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        </View>

        <View style={styles.authorContainer}>
          <Image
            source={{uri: item.author.avatar}}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorName}>{item.author.name}</Text>
        </View>
      </Animated.View>
    );
  };

  const renderItem = ({item, index}) => (
    <AnimationCard item={item} index={index} scrollY={scrollY} />
  );

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer(
        height,
        itemFullSize,
        spacing,
      )}
      snapToInterval={itemFullSize}
      decelerationRate="fast"
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 8,
    gap: 8,
  },
  backgroundImage: {
    borderRadius: 12,
  },
  thumbnail: {
    flex: 1,
    height: '40%',
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  description: {
    color: '#ddd',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorAvatar: {
    width: 24,
    aspectRatio: 1,
    borderRadius: 12,
  },
  authorName: {
    fontSize: 12,
    color: '#ddd',
  },
  listContainer: (height, itemFullSize, spacing) => ({
    paddingHorizontal: spacing * 3,
    paddingVertical: (height - itemFullSize) / 2,
    gap: spacing * 2,
  }),
});

export default VerticalList;
