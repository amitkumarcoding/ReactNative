import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackGrayIcon, GpsIcon} from '../../assets';

const CoffeeMapView = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      <View style={{flex: 1}}>
        <HeaderView navigation={navigation} />
      </View>

      <View
        style={{
          backgroundColor: '#FFF',
          flex: 0.5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <BottomView />
      </View>
    </View>
  );
};

export default CoffeeMapView;

const styles = StyleSheet.create({});

const HeaderView = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 70,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackGrayIcon />
      </TouchableOpacity>
      <TouchableOpacity>
        <GpsIcon />
      </TouchableOpacity>
    </View>
  );
};

const BottomView = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: 45,
          height: 5,
          backgroundColor: '#E3E3E3',
          marginTop: 15,
          borderRadius: 20,
          marginBottom: 15,
        }}
      />
      <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
        10 minutes left
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 12, fontWeight: '200'}}>Delivery to</Text>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}> Jl. Kpg Sutoyo</Text>
      </View>
      <View style={{flexDirection: 'row', gap: 12, marginTop: 25}}>
        {[...Array(4)].map((_, index) => (
          <ProgressBar key={index} index={index} />
        ))}
      </View>

      <View
        style={{
          width: 327,
          height: 77,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#E3E3E3',
          marginTop: 15,
        }}>
        <Image
          style={[styles.iconImage, {width: '28%', height: '28%', alignItems: 'center'}]}
          source={require('../../assets/images/dd1.png')}
          resizeMode='center'
        />
      </View>
    </View>
  );
};

const ProgressBar = ({index}) => {
  return (
    <View
      style={{
        width: 71.5,
        height: 4,
        backgroundColor: index === 3 ? '#E3E3E3' : '#36C07E',
        borderRadius: 50,
      }}
    />
  );
};
