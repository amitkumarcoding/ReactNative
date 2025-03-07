import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CoffeePromo = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/promotion.png')}
      style={styles.container}>
      <Text style={styles.title}>Promo</Text>

      <View style={styles.banner}>
        <Text style={styles.text}>Buy one get</Text>
      </View>

      <View style={styles.banner2}>
        <Text style={styles.text2}>one FREE</Text>
      </View>
    </ImageBackground>
  );
};

export default CoffeePromo;

const styles = StyleSheet.create({
  container: {
    width: 327,
    height: 140,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    top: 70
  },
  title: {
    backgroundColor: '#ED5151',
    width: '20%',
    marginHorizontal: 25,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 8,
    color: '#fff',
  },
  subTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    width: '80%',
    paddingHorizontal: 25,
    color: '#fff',
  },

  banner: {
    backgroundColor: 'black',
    width: '57%',
    height: 27,
    marginHorizontal: 25,
    marginBottom: 12,
    marginTop: 20
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 3,
    right: 2,
    width: '100%',
  },

  banner2: {
    backgroundColor: 'black',
    width: '45%',
    height: 27,
    marginHorizontal: 25
  },
  text2: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 3,
    right: 1,
    width: '100%',
  },
});
