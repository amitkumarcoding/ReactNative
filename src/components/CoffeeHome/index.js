import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import CoffeeHeader from '../CoffeHeader';
import CoffeePromo from '../CoffePromo';
import {Colors} from '../../config/styles';
import CoffeeQuickTab from '../CoffeeQuickTab';
import CoffeeGridView from '../CoffeeGridView';

const CoffeeHome = ({navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{flex: 1}}>
      <View style={styles.container}>
        <CoffeeHeader />
        <CoffeePromo />
      </View>
      <CoffeeQuickTab />
      <CoffeeGridView  navigation={navigation}/>
    </ScrollView>
  );
};

export default CoffeeHome;

const styles = StyleSheet.create({
  container: {
    height: 300,
    paddingTop: 70,
    backgroundColor: Colors.SECONDRY_COLOR,
  },
});
