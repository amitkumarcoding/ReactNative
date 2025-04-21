import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../config/styles';

const SplashScreen = ({navigation}) => {
  const onGetStartedPress = () => {
    navigation.navigate('Grocery');
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={require('../../assets/images/splashBg.jpg')}
          style={styles.image}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.heading}>
          Fall in Love with Coffee in Blissful Delight!
        </Text>
        <Text style={styles.subHeading}>
          Welcome to our cozy coffee corner, where every cup is a delightful for
          you.
        </Text>

        <TouchableOpacity
          onPress={onGetStartedPress}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_000000,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    flex: 0.6,
    backgroundColor: Colors.COLOR_000000,
  },
  heading: {
    color: Colors.COLOR_FFFFFF,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  subHeading: {
    color: Colors.COLOR_88888,
    fontSize: 14,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: Colors.PRIMARY_COLOR,
    width: 332,
    borderRadius: 16,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  buttonText: {
    color: Colors.COLOR_FFFFFF,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
