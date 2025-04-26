import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {data} from './data';
import styles from './styles';

const ListScreen = ({navigation}) => {
  const renderItem = ({item, index}) => {
    const onPress = () => navigation.navigate(item.routeName);
    return (
      <TouchableOpacity key={index} onPress={onPress}>
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>List of RN Component</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ListScreen;
