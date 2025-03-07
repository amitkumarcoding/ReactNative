import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';

const SelectDeselectComponent = () => {
  const [selectedItems, setSelectedItems] = useState(null);

  const options = [
    {id: 1, name: 'C++'},
    {id: 2, name: 'Java'},
    {id: 3, name: 'Python'},
  ];

  const toggleSelection = name => {
    setSelectedItems(prevSelected => (prevSelected === name ? null : name));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.option,
          item.name === selectedItems && styles.selectedOption,
        ]}
        onPress={() => toggleSelection(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={options}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setSelectedItems(null);
          navigation.navigate('WithInBottomScreen', {data: selectedItems});
        }}
        style={styles.buttonContainer}>
        <Text>Go to next screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectDeselectComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888',
  },
  option: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f1f1f1',
  },
  selectedOption: {
    backgroundColor: '#d0f0d0',
    borderWidth: 2,
    borderColor: 'green',
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 150,
  },
  buttonContainer: {
    backgroundColor: 'orange',
    marginTop: 40,
    width: '40%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
