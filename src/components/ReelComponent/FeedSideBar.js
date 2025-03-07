import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommentIcon, HeartIcon, MenuIcon, ShareIcon} from '../../assets';

const IconWithText = ({IconComponent, count}) => (
  <View style={styles.iconContainer}>
    <IconComponent />
    <Text style={styles.countText}>{count}</Text>
  </View>
);

const FeedSideBar = ({data}) => {
  const {likes, comments, shares, thumbnailUrl} = data;

  return (
    <View style={styles.container}>
      <IconWithText IconComponent={HeartIcon} count={likes} />
      <IconWithText IconComponent={CommentIcon} count={comments} />
      <IconWithText IconComponent={ShareIcon} count={shares} />
      <MenuIcon />
      <View style={styles.thumbnailContainer}>
        <Image
          source={{uri: thumbnailUrl}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default FeedSideBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 90,
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 20,
    right: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  countText: {
    color: '#fff',
    marginTop: 10,
  },
  thumbnailContainer: {
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 24,
    height: 24,
    borderRadius: 8,
  },
});
