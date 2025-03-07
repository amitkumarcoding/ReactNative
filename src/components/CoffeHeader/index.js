import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../config/styles';
import {DownIcon, FilterIcon, SearchIcon} from '../../assets';

const CoffeeHeader = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Location</Text>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Bilzen, Tanjungbalai</Text>{' '}
        <View>
          <DownIcon width={14} height={14} />
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.inputContainer}>
          <SearchIcon width={20} height={20} />
          <TextInput
            style={{paddingLeft: 10}}
            placeholder="Search Coffee"
            placeholderTextColor={'#888'}
          />
        </View>

        <TouchableOpacity style={styles.filterContainer}>
          <FilterIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoffeeHeader;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.SECONDRY_COLOR,
    marginHorizontal: 20,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 30},
  title: {
    color: Colors.COLOR_E3E3E3,
    fontSize: 14,
    marginBottom: 12,
  },
  subTitle: {
    color: '#D8D8D8',
    fontSize: 16,
    fontWeight: '600',
  },
  filterContainer: {
    width: 52,
    height: 52,
    backgroundColor: Colors.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputContainer: {
    height: 52,
    width: 285,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
});
