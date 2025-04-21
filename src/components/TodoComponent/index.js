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
import {
  AddButton,
  CrossIconAlt,
  DeleteAllIcon,
  NoData,
  SelectAllIcon,
  SettingAltNewIcon,
  TrashIcon,
} from '../../assets';
import ListView from './ListView';
import ToastContainer from './ToastContainer';

const ToDoComponent = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [showToast, setToast] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [hideIcons, setHideIcons] = useState(true);
  const [isSelectAllPress, setSelectAllPress] = useState(false);
  const [showSingleDeleteIcon, setShowSingleDeleteIcon] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  let dataRef = useRef([]);
  let intervalRef = useRef(null);
  let inputRef = useRef(null);
  let openRowRef = useRef(null);
  let deletingIdRef = useRef([]);

  let isContentDeletedRef = useRef(false);
  let isContentUpdatedRef = useRef(false);

  useEffect(() => {
    if (data.length === 0) {
      setHideIcons(true);
    }
  }, [data]);

  useEffect(() => {
    if (showToast) {
      intervalRef.current = setTimeout(() => {
        setToast(false);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [showToast]);

  const onSendPress = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return;
    }
    isContentDeletedRef.current = false;
    openRowRef.current?.close();
    if (isContentUpdatedRef.current) {
      setToast(true);

      isContentUpdatedRef.current = false;
    } else {
      setToast(false);
    }
    if (editingId !== null) {
      setData(prev =>
        prev.map(task =>
          task.id === editingId ? {...task, text: trimmedInput} : task,
        ),
      );
      setEditingId(null);
    } else {
      setData(prev => [...prev, {id: Date.now(), text: trimmedInput}]);
    }

    setInput('');
  }, [input, editingId, isContentUpdatedRef, isContentDeletedRef]);

  const onDeletePress = useCallback(
    taskId => {
      isContentDeletedRef.current = true;
      setToast(true);
      dataRef.current = data;
      setData(prev => prev.filter(task => task.id !== taskId));
    },
    [data, isContentDeletedRef],
  );

  const onContentPress = useCallback(
    (taskId, taskText, isAnyContentUpdated) => {
      isContentUpdatedRef.current = isAnyContentUpdated;
      setEditingId(taskId);
      setInput(taskText);
      inputRef.current?.focus();
    },
    [],
  );

  const onSelectedDeleteContent = useCallback(deleteId => {
    deletingIdRef.current.push(deleteId);
  }, []);

  const contentSelectedCount = val => {
    setSelectedItems(prevItems => {
      if (prevItems.includes(val)) {
        return prevItems.filter(item => item !== val);
      } else {
        return [...prevItems, val];
      }
    });
  };

  const renderItem = useCallback(
    ({item, index}) => (
      <ListView
        item={item}
        onContentPress={onContentPress}
        onDeletePress={onDeletePress}
        index={index}
        openRowRef={openRowRef}
        setInput={setInput}
        data={data}
        hideIcons={hideIcons}
        isSelectAllPress={isSelectAllPress}
        selectedDeleteContent={onSelectedDeleteContent}
        isHeaderCrossPress={onHeaderCrossPress}
        contentSelectedCount={contentSelectedCount}
      />
    ),
    [
      onContentPress,
      onDeletePress,
      data,
      hideIcons,
      isSelectAllPress,
      onSelectedDeleteContent,
    ],
  );

  const onUndoPress = () => {
    clearTimeout(intervalRef.current);
    setToast(false);

    isContentDeletedRef.current = false;
    setData(dataRef.current);
  };

  const onDeleteContentPress = () => {
    setShowSingleDeleteIcon(true);

    setHideIcons(false);
    if (isSelectAllPress) {
      setData([]);
      setSelectAllPress(false);
      setHideIcons(true);
    }

    setData(prev =>
      prev.filter(task => !deletingIdRef.current.includes(task.id)),
    );
  };
  const onHeaderCrossPress = () => {
    deletingIdRef.current = [];
    setSelectAllPress(false);
    setShowSingleDeleteIcon(false);
    setHideIcons(true);
    setSelectedItems([]);
  };

  const onSelectAllPress = () => {
    setSelectAllPress(!isSelectAllPress);

    if (isSelectAllPress) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        {!hideIcons && (
          <TouchableOpacity onPress={onHeaderCrossPress}>
            <CrossIconAlt />
          </TouchableOpacity>
        )}
        {!hideIcons ? (
          <Text
            style={[
              styles.heading,
              {textAlign: 'left', fontSize: 22},
            ]}>{`${selectedItems.length} Selected`}</Text>
        ) : (
          <Text style={styles.heading}>Simple Todo</Text>
        )}

        {hideIcons && (
          <TouchableOpacity style={{marginRight: 15}}>
            <SettingAltNewIcon width={24} height={24} />
          </TouchableOpacity>
        )}

        {!hideIcons && (
          <TouchableOpacity
            onPress={onSelectAllPress}
            style={{marginRight: 15}}>
            <SelectAllIcon width={24} height={24} />
          </TouchableOpacity>
        )}
        {data.length > 0 && (
          <TouchableOpacity onPress={onDeleteContentPress}>
            {showSingleDeleteIcon ? (
              <TrashIcon width={24} height={24} />
            ) : (
              <DeleteAllIcon width={30} height={30} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {data?.length === 0 ? (
        <NoData />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showToast && (
        <ToastContainer
          isContentUpdated={isContentUpdatedRef.current}
          onCrossPress={() => {
            setToast(false);
            clearTimeout(intervalRef.current);
          }}
          isContentDeleted={isContentDeletedRef.current}
          onUndoPress={onUndoPress}
          data={data}
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
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
    marginVertical: 20,
    flex: 1,
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
});
