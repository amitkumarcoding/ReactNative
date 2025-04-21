import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListView = ({imageUrl}) => {
  return (
    <View style={styles.container}>
      <Image style={{width: 100, height: 100, backgroundColor: 'transparent'}} source={imageUrl} />
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 242,
    backgroundColor: '#F9F8F6',
    marginRight: 9,
    borderRadius: 10,
    
  },
});
