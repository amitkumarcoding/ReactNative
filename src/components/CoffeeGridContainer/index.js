import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AddIcon, StarIcon} from '../../assets';
import {Colors} from '../../config/styles';
import Animated from 'react-native-reanimated';

const CoffeeGridContainer = ({
  backgroundImage = '',
  title = '',
  subTitle = '',
  price = '',
  rating = '',
  onContentPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onContentPress} style={styles.container}>
      <ImageBackground style={styles.image} source={backgroundImage}>
        <Animated.View style={{flexDirection: 'row-reverse'}} sharedTransitionTag='tag' >
          <View style={styles.imageContainer}>
            <StarIcon />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </Animated.View>
      </ImageBackground>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subTitle}>{subTitle}</Text>

      <View style={styles.rowContainer}>
        <Text style={styles.price}>{`$ ${price}`}</Text>
        <TouchableOpacity>
          <AddIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CoffeeGridContainer;

const styles = StyleSheet.create({
  container: {
    width: 156,
    height: 238,
    backgroundColor: '#eee',
    borderRadius: 8,
    margin: 20,
  },
  image: {
    width: 140,
    height: 128,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.COLOR_000000,
    marginLeft: 10,
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 12,
    color: Colors.COLOR_88888,
    marginLeft: 10,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.COLOR_000000,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.COLOR_FFFFFF,
    fontWeight: '700',
    marginLeft: 3,
  },
  imageContainer: {
    flexDirection: 'row',
    backgroundColor: '#1111114D',
    width: 51,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
  },
});
