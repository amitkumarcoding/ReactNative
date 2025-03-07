import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';

const ToDoComponent = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);

  const deleteTask = taskId => {
    const filterData = data.filter(item => item.id !== taskId);
    setData(filterData);
  };

  const toggleTask = id => {};

  const onTextPress = (taskTitle, taskId) => {
    console.log('title>>>', taskTitle);
    setInput(taskTitle)

    setData(prevData => prevData.map(item => item.id === taskId ? {...item, text: taskTitle} : item))
  };

  const renderItem = ({item, index}) => {
    console.log('item-----', item);
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => toggleTask(item.id)}>
          <Text style={[styles.check, item.completed && styles.completedCheck]}>
            ✔
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => onTextPress(item.text, item.id)}
          style={[styles.taskText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.delete}>✖</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onSendPress = () => {
    setData(prevData => [
      ...prevData,
      {id: Date.now().toString(), text: input, completed: false},
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Simple Todo</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={input}
          onChangeText={val => {
            console.log('>>', val);
            setInput(val);
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={onSendPress}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ToDoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9D50BB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  check: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
  },
  completedCheck: {
    textDecorationLine: 'line-through',
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#D3D3D3',
  },
  delete: {
    fontSize: 20,
    color: 'red',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#9D50BB',
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
});
