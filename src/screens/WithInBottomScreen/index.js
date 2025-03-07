import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WithInBottomScreen = ({navigation, route}) => {
  const selectedLanguage = route.params.data;
  return (
    <View style={styles.container}>
      <Text>{`You have selected "${selectedLanguage}" language`}</Text>
      <Button title="goBack" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default WithInBottomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
