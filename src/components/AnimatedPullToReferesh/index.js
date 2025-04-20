/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useCallback, useState, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import data from './data';
import {
  HarryPotterGridComponent,
  HarryPotterHeaderComponent,
} from '../HarryPotterUI';

const {width} = Dimensions.get('screen');

const PAGE_SIZE = 6;

const AnimatedPullToRefresh = () => {
  const scrollPosition = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(data.slice(0, PAGE_SIZE));

  // Refresh Function
  const onRefresh = useCallback(done => {
    setIsLoaderActive(true);
    setTimeout(() => {
      setIsLoaderActive(false);
      isReadyToRefresh.value = false;
      setPage(1);
      setItems(data.slice(0, PAGE_SIZE)); // Reset data on refresh
      done();
    }, 5000);
  }, []);

  // Load More Function
  const loadMoreData = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      const newPage = page + 1;
      const newData = data.slice(0, newPage * PAGE_SIZE);

      if (newData.length > items.length) {
        setItems(newData);
        setPage(newPage);
      }

      setIsLoadingMore(false);
    }, 3000);
  };

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 120 : 0, {
      duration: 180,
    });

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;
      onRefresh(() => {
        pullDownPosition.value = withTiming(0, {duration: 180});
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
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const pullDownStyle = useAnimatedStyle(() => ({
    transform: [{translateY: pullDownPosition.value}],
  }));

  const refreshContainerStyle = useAnimatedStyle(() => ({
    height: pullDownPosition.value,
    opacity: 1,
    top: pullDownPosition.value - 200,
  }));

  const renderSkeletonView = () => {
    return (
      <View style={styles.skeletonContainer}>
        {/* {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <SkeletonPlaceholder key={index} backgroundColor="#333">
            <SkeletonPlaceholder.Item
              flexDirection="column"
              alignItems="center"
              style={{marginBottom: 20}}>
              <SkeletonPlaceholder.Item
                width={160}
                height={240}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={20}
                marginTop={15}
              />
              <SkeletonPlaceholder.Item width={90} height={15} marginTop={10} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ))} */}
      </View>
    );
  };

  const renderItem = useCallback(
    ({item}) => (
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
          {paddingTop: Math.max(insets.top, 15)},
        ]}
        {...panResponderRef.current.panHandlers}>
        {isLoaderActive ? (
          renderSkeletonView()
        ) : (
          <Animated.FlatList
            data={items}
            scrollEventThrottle={16}
            bounces={false}
            renderItem={renderItem}
            key={2}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeparatorStyle} />
            )}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5} // Load more when reaching 50% from the end
            ListFooterComponent={() =>
              isLoadingMore ? (
                <LottieView
                  source={require('./9.json')}
                  autoPlay
                  loop
                  speed={0.5}
                  style={styles.loaderMoreAnimation}
                />
              ) : null
            }
            ListHeaderComponent={
              <>
                <HarryPotterHeaderComponent
                  rowContainerAlt={{marginTop: 20}}
                  textInputRowAlt={{marginBottom: 20}}
                />
                <HarryPotterGridComponent
                  contentContainerStyle={{paddingBottom: 90}}
                />
              </>
            }
          />
        )}
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
  loaderMoreAnimation: {
    width,
    height: 300,
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
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
