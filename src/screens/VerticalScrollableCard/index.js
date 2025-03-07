import {StyleSheet, View} from 'react-native';
import React from 'react';
import VerticalList from './VerticalList';
import {VIDEO_DATA} from './data';

const VerticalScrollableCard = () => {
  return (
    <View style={styles.container}>
      <VerticalList data={VIDEO_DATA} />
    </View>
  );
};

export default VerticalScrollableCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
  },
});
