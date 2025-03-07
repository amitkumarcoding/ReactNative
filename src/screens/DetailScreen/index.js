import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
      <Button title='Navigate within tab' onPress={() => navigation.navigate('WithInBottomScreen')}/>
      <Button title='Navigate to Stack' onPress={() => navigation.navigate('FullScreen')}/>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})