import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AddButton} from '../../assets';
import ListView from './ListView';
import ToastContainer from './ToastContainer';

const ToDoComponent = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [showToast, setToast] = useState(false);

  let dataRef = useRef([]);
  let inputRef = useRef(null);
  let openRowRef = useRef(null);
  let editingIdRef = useRef(null);
  let isContentDeletedRef = useRef(false);
  let isContentUpdatedRef = useRef(false);


  useEffect(() => {
    console.log('isContentDeletedRef', isContentDeletedRef.current)
    // console.log('object', isContentUpdatedRef.current, isContentDeletedRef.current)
    // if (isContentUpdatedRef.current || isContentDeletedRef.current) {
    //   console.log('inside fas')
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 4000);
    // }
  }, [isContentDeletedRef]);



  const onSendPress = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return;
    }
    openRowRef.current?.close();
    if (isContentUpdatedRef.current) {
      setToast(true);

      isContentUpdatedRef.current = false;
    } else {
      setToast(false);
    }
    if (editingIdRef.current !== null) {
      setData(prev =>
        prev.map(task =>
          task.id === editingIdRef.current
            ? {...task, text: trimmedInput}
            : task,
        ),
      );
      editingIdRef.current = null;
    } else {
      setData(prev => [...prev, {id: Date.now(), text: trimmedInput}]);
    }

    setInput('');
  }, [input, editingIdRef, isContentUpdatedRef]);

  const onDeletePress = useCallback(taskId => {
    console.log('delete press')
    isContentDeletedRef.current = true;
    console.log('isContentDeletedRef0000', isContentDeletedRef.current)
      setToast(true);
      dataRef.current = data;
      setData(prev => prev.filter(task => task.id !== taskId));
      
    },
    [data, isContentDeletedRef],
  );

  const onContentPress = useCallback(
    (taskId, taskText, isAnyContentUpdated) => {
      isContentUpdatedRef.current = isAnyContentUpdated;
      editingIdRef.current = taskId;
      setInput(taskText);
      inputRef.current?.focus();
    },
    [],
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <ListView
        item={item}
        onContentPress={onContentPress}
        onDeletePress={onDeletePress}
        index={index}
        openRowRef={openRowRef}
        setInput={setInput}
      />
    ),
    [onContentPress, onDeletePress],
  );

  const onUndoPress = () => {
    setToast(false);

    isContentDeletedRef.current = false;
    setData(dataRef.current);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Simple Todo</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />

      {showToast && (
        <ToastContainer
          isContentUpdated={isContentUpdatedRef.current}
          onCrossPress={() => setToast(false)}
          isContentDeleted={isContentDeletedRef.current}
          onUndoPress={onUndoPress}
        />
      )}

      <View style={styles.bottomContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            ref={inputRef}
            value={input}
            placeholder="Add a new Task"
            placeholderTextColor="#777"
            onChangeText={setInput}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={onSendPress}>
          <AddButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ToDoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heading: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 150,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  textInputContainer: {
    borderWidth: 1.5,
    borderColor: '#3E1671',
    marginLeft: 25,
    marginRight: 15,
    width: '75%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  textInput: {
    paddingLeft: 20,
    color: '#fff',
  },
});
