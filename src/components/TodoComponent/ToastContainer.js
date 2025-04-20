import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CrossIconAlt, GreenTick} from '../../assets';

const ToastContainer = ({
  isContentDeleted = false,
  onCrossPress = () => {},
  onUndoPress = () => {},
}) => {
  return (
    <View style={styles.toastContainer}>
      {!isContentDeleted && <GreenTick width={25} height={25} />}
      <Text style={styles.toastText}>Changes applied successfully!</Text>
      {isContentDeleted ? (
        <TouchableOpacity style={styles.undoContainer} onPress={onUndoPress}>
          <Text style={styles.toastText}>Undo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onCrossPress}>
          <CrossIconAlt />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ToastContainer;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3E1671',
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    alignSelf: 'center',
  },
  toastText: {
    color: '#fff',
    paddingHorizontal: 12,
  },
  undoContainer: {
    backgroundColor: '#3E1671',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: '#fff'
  },
});
