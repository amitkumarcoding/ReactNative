import React, { useRef, useCallback, memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import data from './data';

const { width } = Dimensions.get('screen');

const AnimatedPullToRefresh = () => {
  const scrollPosition = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const isLoaderActive = useSharedValue(false);

  const onRefresh = useCallback((done) => {
    isLoaderActive.value = true;

    setTimeout(() => {
      isLoaderActive.value = false;
      isReadyToRefresh.value = false;
      done();
    }, 5000);
  }, []);

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 120 : 0, {
      duration: 180,
    });

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;
      onRefresh(() => {
        pullDownPosition.value = withTiming(0, { duration: 180 });
      });
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (_, gestureState) => {
        return scrollPosition.value <= 0 && gestureState.dy > 0;
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return scrollPosition.value <= 0 && gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        const maxPullDistance = 150;
        pullDownPosition.value = Math.min(
          maxPullDistance,
          Math.max(0, gestureState.dy),
        );
        isReadyToRefresh.value = pullDownPosition.value >= maxPullDistance / 2;
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const pullDownStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pullDownPosition.value }],
  }));

  const refreshContainerStyle = useAnimatedStyle(() => ({
    height: pullDownPosition.value,
    opacity: 1,
    top: pullDownPosition.value - 200,
  }));

  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle}>{`${item.director} | ${item.year}`}</Text>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000'} />
      <Animated.View style={[refreshContainerStyle, styles.loaderContainer]}>
        <LottieView
          source={require('./4.json')}
          autoPlay
          loop
          speed={0.5}
          style={styles.loader}
        />
      </Animated.View>

      <Animated.View
        style={[
          pullDownStyle,
          styles.pullDownStyles,
          { paddingTop: Math.max(insets.top, 15) },
        ]}
        {...panResponderRef.current.panHandlers}
      >
        <Animated.FlatList
          data={data}
          scrollEventThrottle={16}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorStyle} />
          )}
          onScroll={scrollHandler}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      </Animated.View>
    </View>
  );
};

export default memo(AnimatedPullToRefresh);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
  },
  pullDownStyles: {
    backgroundColor: '#0A0A0A',
    flex: 1,
    paddingHorizontal: 5,
  },
  itemSeparatorStyle: {
    margin: 6,
  },
  image: {
    width: 200,
    height: 300,
    marginRight: 10,
    borderRadius: 8,
  },
  loader: {
    width,
    height: 300,
  },
  loaderContainer: {
    alignItems: 'center',
    width,
    position: 'absolute',
  },
  title: {
    width: 180,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  subTitle: {
    width: 180,
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
});