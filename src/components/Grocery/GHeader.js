import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GBacKIcon, GMenuIcon, GSearchIcon} from '../../assets';

const GHeader = ({title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <GBacKIcon />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <GMenuIcon />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, {right: 10}]}>
          <GSearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 70,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  iconButton: {
    marginLeft: 12,
  },
});
