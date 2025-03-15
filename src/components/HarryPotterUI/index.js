import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NotificationIcon, SearchIconAlt} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {DATA} from './data';

const HarryPotterUI = () => {
  return (
    <LinearGradient
      style={styles.container}
      colors={['#1E1E1E', '#3A3A3A']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <ImageBackground
        style={styles.container}
        resizeMode="contain"
        source={require('./bg.png')}>
        <HarryPotterHeaderComponent />
        <HarryPotterGridComponent />
      </ImageBackground>
    </LinearGradient>
  );
};

export default HarryPotterUI;

export const HarryPotterHeaderComponent = ({
  rowContainerAlt = () => {},
  textInputRowAlt = () => {},
}) => {
  return (
    <>
      <View style={[styles.rowContainer, rowContainerAlt]}>
        <Image source={require('./MOVIER.png')} />
        <NotificationIcon />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.rowAltContainer}>
          <Text style={styles.hello}>Hello </Text>
          <Text style={styles.name}>Amit</Text>
        </View>
        <Text style={styles.subTitle}>Let’s Find Yout Favorite Movie</Text>
      </View>

      <View style={[styles.textInputRow, textInputRowAlt]}>
        <SearchIconAlt />
        <Image
          source={require('./borderFrame.png')}
          style={styles.textInput}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export const HarryPotterGridComponent = ({contentContainerStyle}) => {
  const renderItem = ({item, index}) => {
    return (
      <Image
        source={item.images}
        style={{width: 300, height: 400, marginTop: 40}}
        resizeMode="contain"
      />
    );
  };
  return (
    <>
      <Text style={styles.heading}>Trending Movies</Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={contentContainerStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  hello: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  subTitle: {
    color: '#eee',
    fontSize: 16,
    fontWeight: '500',
  },
  textContainer: {marginHorizontal: 20, marginTop: 30},
  rowAltContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textInput: {
    width: 274,
    height: 56,
    left: 20,
  },
  textInputRow: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 30,
  },
});
