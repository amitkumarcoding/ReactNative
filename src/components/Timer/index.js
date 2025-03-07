import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const TimerComponent = () => {
  const [timer, setTimer] = useState(0);

  const onIncrementPress = () => {
    setTimer(timer + 1);
  };

  const onDecrementPress = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{timer}</Text>

      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onIncrementPress}>
          <Text>Increment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDecrementPress}>
          <Text>Decrement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerText: {
    fontSize: 40,
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
