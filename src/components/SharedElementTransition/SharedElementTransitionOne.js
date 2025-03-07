import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ToDoComponent from '../TodoComponent'

const SharedElementTransitionOne = () => {
  return (
    <View>
      <ToDoComponent />
    </View>
  )
}

export default SharedElementTransitionOne

const styles = StyleSheet.create({})