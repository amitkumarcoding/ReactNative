import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  Animated,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {CheckedBox, DeleteIcon, EditIcon, UnCheckedBox} from '../../assets';

const ListView = ({
  item,
  index,
  onContentPress = () => {},
  onDeletePress = () => {},
  openRowRef,
  setInput,
  data,
  hideIcons,
  isSelectAllPress,
  selectedDeleteContent = () => {},
}) => {
  const swipeableRef = useRef(null);
  const [isChecked, setChecked] = useState(false);
  const fadeAnim = useAnimatedValue(0);

  useEffect(() => {
    if (data) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [data, fadeAnim, onDeletePress]);

  const handleSwipeableOpen = () => {
    setInput('');
    if (openRowRef.current && openRowRef.current !== swipeableRef.current) {
      openRowRef.current.close();
    }
    openRowRef.current = swipeableRef.current;
  };

  const leftSwipe = () => (
    <TouchableOpacity
      style={styles.leftActionContainer}
      onPress={() => onDeletePress(item.id)}>
      <DeleteIcon width={25} height={25} />
    </TouchableOpacity>
  );

  const rightSwipe = () => (
    <TouchableOpacity
      onPress={() => {
        onContentPress(item.id, item.text, true);
      }}
      style={styles.rightActionContainer}>
      <EditIcon width={25} height={25} />
    </TouchableOpacity>
  );

  const onSelectDeselect = deleteId => {
    setChecked(!isChecked);

    if (!isChecked) {
      selectedDeleteContent(deleteId);
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableOpen={handleSwipeableOpen}
      renderLeftActions={leftSwipe}
      renderRightActions={rightSwipe}>
      <TouchableOpacity>
        <Animated.View
          key={index}
          style={[styles.taskContainer, {opacity: fadeAnim}]}>
          {!hideIcons && (
            <TouchableOpacity
              onPress={() => onSelectDeselect(item.id)}
              style={{marginRight: 10}}>
              {isSelectAllPress || isChecked ? (
                <CheckedBox width={20} height={20} />
              ) : (
                <UnCheckedBox width={20} height={20} />
              )}
            </TouchableOpacity>
          )}
          <Text style={styles.taskText}>{item.text}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListView;

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#3E1671',
    marginHorizontal: 25,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  taskText: {
    color: '#fff',
  },

  leftActionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 50,
    marginBottom: 10,
    paddingLeft: 20,
    backgroundColor: 'transparent',
  },

  rightActionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 50,
    marginBottom: 10,
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
});
