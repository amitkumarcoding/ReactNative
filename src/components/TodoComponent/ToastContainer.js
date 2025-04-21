import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  useAnimatedValue,
} from 'react-native';
import React, {useEffect} from 'react';
import {CrossIconAlt, GreenTick} from '../../assets';

const ToastContainer = ({
  data = [],
  onUndoPress = () => {},
  onCrossPress = () => {},
  isContentDeleted = false,
}) => {
  const fillAnim = useAnimatedValue(0);
  useEffect(() => {
    if (data) {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      }).start();
    }
  }, [data, fillAnim]);

  const animatedFill = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '115%'],
  });

  return (
    <View style={styles.toastContainer}>
      {!isContentDeleted && <GreenTick width={25} height={25} />}
      <Text style={styles.toastText}>Changes applied successfully!</Text>
      {isContentDeleted ? (
        <TouchableOpacity style={[styles.undoContainer]} onPress={onUndoPress}>
          <Animated.View style={[styles.undoFill, {width: animatedFill}]} />
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
  },
  undoFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    borderRadius: 10,
  },
});
