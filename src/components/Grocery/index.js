import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GHeader from './GHeader';
import GridView from './GridView';

const Grocery = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GHeader title={'Vegetables'} />
      <GridView />
    </SafeAreaView>
  );
};

export default Grocery;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
