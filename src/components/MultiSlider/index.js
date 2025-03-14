import React, {memo, useCallback, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DATA} from './data';

const MultiSlider = () => {
  const verticalListRef = useRef(null);
  const horizontalListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle vertical scroll to sync horizontal scroll
  const handleVerticalScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const index = Math.round(scrollPosition / 220); // Adjust based on item height

    setActiveIndex(index);
    scrollHorizontal(index);
  };

  // Scroll horizontal list to the selected index
  const scrollHorizontal = (index) => {
    if (horizontalListRef.current) {
      horizontalListRef.current.scrollToOffset({
        offset: index * 80, // Adjust based on item width
        animated: true,
      });
    }
  };

  // Scroll vertical list when header item is clicked
  const scrollToItem = (index) => {
    setActiveIndex(index);
    if (verticalListRef.current) {
      verticalListRef.current.scrollToOffset({
        offset: index * 220, // Adjust based on item height
        animated: true,
      });
    }
    scrollHorizontal(index);
  };

  const renderItem = useCallback(({item}) => {
    return (
      <Image
        source={item.thumbnailUrl}
        resizeMode="cover"
        style={styles.image}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView data={DATA} listRef={horizontalListRef} activeIndex={activeIndex} onPress={scrollToItem} />
      <FlatList
        ref={verticalListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScroll={handleVerticalScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const HeaderView = memo(({data, listRef, activeIndex, onPress}) => {
  const renderItem = useCallback(({item, index}) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        style={[
          styles.headerItem,
          isActive && styles.activeHeaderItem, // Apply highlight styles if active
        ]}
        onPress={() => onPress(index)}>
        <Text style={isActive ? styles.activeText : styles.text}>{item.uploadTime}</Text>
      </TouchableOpacity>
    );
  }, [activeIndex, onPress]);

  return (
    <FlatList
      ref={listRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.headerContainer}
    />
  );
});

export default MultiSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 20,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  headerContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerItem: {
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  activeHeaderItem: {
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
  text: {
    color: 'black',
  },
  activeText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
