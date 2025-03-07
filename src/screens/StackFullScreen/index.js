import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StackFullScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>StackFullScreen</Text>
      <Button title="Go Back" onPress={() => navigation?.goBack()} />
    </View>
  );
};

export default StackFullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
