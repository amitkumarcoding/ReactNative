import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AddButton, NoData} from '../../assets';
import ListView from './ListView';
import ToastContainer from './ToastContainer';
import HeaderComponent from './Header';
import SearchComponent from './SearchComponent';

const ToDoComponent = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [showToast, setToast] = useState(false);
  const [hideIcons, setHideIcons] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAllPress, setSelectAllPress] = useState(false);
  const [showSingleDeleteIcon, setShowSingleDeleteIcon] = useState(false);

  let dataRef = useRef([]);
  let inputRef = useRef(null);
  let openRowRef = useRef(null);
  let deletingIdRef = useRef([]);
  let intervalRef = useRef(null);
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
    setSelectedItems([]);
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
      setData(prev => {
        const updated = prev.map(task =>
          task.id === editingId ? {...task, text: trimmedInput} : task,
        );
        setOriginalData(updated);
        return updated;
      });
      setEditingId(null);
    } else {
      const newTask = {id: Date.now(), text: trimmedInput};
      setData(prev => {
        const updated = [...prev, newTask];
        setOriginalData(updated);
        return updated;
      });
    }

    setInput('');
  }, [input, editingId, isContentUpdatedRef, isContentDeletedRef]);

  const onDeletePress = useCallback(
    taskId => {
      isContentDeletedRef.current = true;
      setToast(true);
      dataRef.current = data;

      setData(prev => {
        const updated = prev.filter(task => task.id !== taskId);
        setOriginalData(updated); // Keep originalData updated
        return updated;
      });
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
    setOriginalData(dataRef.current);
  };

  const onDeleteContentPress = () => {
    setShowSingleDeleteIcon(true);

    setHideIcons(false);
    if (isSelectAllPress) {
      setData([]);
      setSelectAllPress(false);
      setHideIcons(true);
    }

    setData(prev => {
      const updated = prev.filter(
        task => !deletingIdRef.current.includes(task.id),
      );
      setOriginalData(updated);
      return updated;
    });
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

  const onSearch = val => {
    const lowercasedValue = val.toLowerCase();
    if (lowercasedValue === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(item =>
        item.text.toLowerCase().includes(lowercasedValue),
      );
      setData(filteredData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        data={data}
        hideIcons={hideIcons}
        onDeleteContentPress={onDeleteContentPress}
        onHeaderCrossPress={onHeaderCrossPress}
        onSelectAllPress={onSelectAllPress}
        selectedItems={selectedItems}
        showSingleDeleteIcon={showSingleDeleteIcon}
      />

      <SearchComponent onSearch={onSearch} />

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
