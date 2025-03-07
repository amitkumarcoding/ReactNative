import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LanguageComponent from '../../components/LanguageComponent';
import StackFullScreen from '../StackFullScreen';
import DebouncingComponent from '../../components/Debouncing';
import PaginationComponent from '../../components/PaginationFlatlist';
import CoffeeHome from '../../components/CoffeeHome';
import {Colors} from '../../config/styles';

const HomeScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <CoffeeHome navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
