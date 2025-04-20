import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HarryPotterHeaderComponent} from '../HarryPotterUI';
import TopView from './TopView';

const HarryPotterView = () => {
  return (
    <View style={styles.container}>
      
      <TopView />
    </View>
  );
};

export default HarryPotterView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
