import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CoffeeCommonHeader from '../../components/common/CoffeeHeader';
import {
  DiscountIcon,
  DownAltIcon,
  EditIcon,
  MinusIcon,
  NotesIcon,
  PlusIcon,
  RightIcon,
  WalletIcon,
} from '../../assets';

const CoffeeOrderScreen = ({navigation, route}) => {
  const {coverImage, productName, productDesc, rating, desc} =
    route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <CoffeeCommonHeader navigation={navigation} title="Order" />
      <ToggleSwitchContainer />
      <ContentContainer />
      <BottomSheetContainer navigation={navigation} />
      <ViewSection
        coverImage={coverImage}
        name={productName}
        desc={productDesc}
      />
      <DiscountView />
      <PaymentView />
    </SafeAreaView>
  );
};

export default CoffeeOrderScreen;

const ToggleSwitchContainer = () => {
  const [isSelected, setSelected] = useState('Delivery');

  const DATA = [
    {
      id: 1,
      title: 'Delivery',
    },
    {
      id: 2,
      title: 'Pick Up',
    },
  ];

  return (
    <View style={styles.rowContainer}>
      {DATA.map((item, index) => {
        const onContentPress = text => {
          setSelected(text.title);
        };

        return (
          <TouchableOpacity key={index} onPress={() => onContentPress(item)}>
            <Text
              style={[
                isSelected === item.title
                  ? styles.subContainer
                  : styles.subContainerAlt,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomSheetContainer = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
        <WalletIcon />
        <View style={{flex: 1, marginLeft: 15, marginBottom: 15}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Cash/Wallet</Text>
          <Text style={{fontSize: 12}}>$5.53</Text>
        </View>
        <DownAltIcon />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} style={styles.buttonContainer}>
        <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
          Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ContentContainer = () => {
  return (
    <View style={{marginHorizontal: 20}}>
      <Text
        style={{
          fontSize: 16,
          color: '#000',
          fontWeight: '600',
          marginVertical: 15,
        }}>
        Delivery Address
      </Text>
      <Text style={{fontSize: 14, color: '#000'}}>Jl. Kpg Sutoyo</Text>
      <Text style={{fontSize: 12, color: '#A2A2A2', marginTop: 5}}>
        Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#888',
            paddingVertical: 5,
            paddingHorizontal: 8,
            borderRadius: 20,
            marginRight: 12,
          }}>
          <EditIcon />
          <Text style={{marginLeft: 5}}>Edit Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#888',
            paddingVertical: 5,
            paddingHorizontal: 8,
            borderRadius: 20,
          }}>
          <NotesIcon />
          <Text style={{marginLeft: 5}}>Add Notes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />
    </View>
  );
};

const ViewSection = ({coverImage, name, desc}) => {
  const [number, setNumber] = useState(1);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        resizeMode="cover"
        source={coverImage}
        style={{width: 54, height: 54, borderRadius: 8, marginHorizontal: 25}}
      />
      <View style={{marginRight: 60}}>
        <Text style={{fontSize: 16, color: 'black', marginBottom: 5}}>
          {name}
        </Text>
        <Text style={{fontSize: 12, color: '#888'}}>{desc}</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MinusIcon />
        <Text style={{marginHorizontal: 20, fontSize: 14}}>{number}</Text>
        <PlusIcon />
      </View>
    </View>
  );
};

const DiscountView = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EDEDED',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 15,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
      }}>
      <DiscountIcon />
      <Text style={{marginLeft: 10, marginRight: 150, fontSize: 14}}>
        1 Discount is Applies
      </Text>
      <RightIcon />
    </TouchableOpacity>
  );
};

const PaymentView = () => {
  return (
    <View style={{marginHorizontal: 20, marginTop: 20}}>
      <Text style={{fontSize: 16, marginBottom: 20}}>Payment Summary</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 14, marginBottom: 10}}>Price</Text>
          <Text style={{fontSize: 14}}>Delivery Fee</Text>
        </View>

        <View>
          <Text style={{fontSize: 14, marginBottom: 10, fontWeight: 'bold'}}>$ 4.53</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', right: 20}}>
            <Text
              style={{
                fontSize: 14,
                textDecorationLine: 'line-through',
                right: 12,
                fontWeight: '400'
              }}>
              $ 2.0
            </Text>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>$ 1.0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#E3E3E3',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    marginTop: 30,
  },
  subContainer: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  subContainerAlt: {
    backgroundColor: '#E3E3E3',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    height: 56,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    // marginTop: 50,
  },
  separator: {
    height: 1.5,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  balance: {
    fontSize: 14,
    color: '#A76D44',
    fontWeight: '600',
  },
  dropdown: {
    marginLeft: 8,
  },
});
