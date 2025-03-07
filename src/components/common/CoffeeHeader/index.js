import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackIcon} from '../../../assets';

const CoffeeCommonHeader = ({
  title = '',
  rightIcon = false,
  onRightIconPress = () => {},
  navigation,
}) => {
  return (
    <View style={[styles.container, !rightIcon && styles.centerContent]}>
      <TouchableOpacity onPress={() => {
        console.log('object')
        navigation.goBack()
      }}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={[styles.title, !rightIcon && styles.centerTitle]}>
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CoffeeCommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 18,
  },
  centerContent: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  centerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
