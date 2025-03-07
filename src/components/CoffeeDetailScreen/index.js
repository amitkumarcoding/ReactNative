import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CoffeeCommonHeader from '../common/CoffeeHeader';
import {LikeIcon, StarIcon} from '../../assets';
import {Colors} from '../../config/styles';

const CoffeeDetailScreen = ({navigation, route}) => {
  const {coverImage, productName, productDesc, rating, desc} =
    route.params.data;

  const [isSizeSelected, setSizeSelected] = useState('M');
  const [isExpanded, setIsExpanded] = useState(false);

  const data = [
    {id: 1, title: 'S'},
    {id: 2, title: 'M'},
    {id: 3, title: 'L'},
  ];

  const getTruncatedText = text => {
    return text.length > 100 ? `${text.slice(0, 130)}...` : text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CoffeeCommonHeader
        navigation={navigation}
        rightIcon={<LikeIcon />}
        title="Detail"
      />

      <Image
        resizeMode="cover"
        style={styles.coverImage}
        source={coverImage}
        sharedTransitionTag="tag"
      />

      <View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{productName}</Text>

          <View style={styles.productInfo}>
            <Text style={styles.subTitle}>{productDesc}</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconWrapper}>
                <Image
                  style={[styles.iconImage, {width: '65%', height: '65%'}]}
                  source={require('../../assets/images/dd1.png')}
                />
              </View>
              <View style={[styles.iconWrapper, styles.iconSpacing]}>
                <Image
                  style={styles.iconImage}
                  source={require('../../assets/images/dd2.png')}
                />
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  style={styles.iconImage}
                  source={require('../../assets/images/dd3.png')}
                />
              </View>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <StarIcon width={20} height={20} />
            <Text style={styles.rating}>{rating}</Text>
          </View>

          <View style={styles.separator} />

          <Text style={[styles.title, {marginTop: 2}]}>Description</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={styles.subTitle}>
              {isExpanded ? desc : getTruncatedText(desc)}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={[styles.toggleText, {right: 118, bottom: 14}]}>
                {isExpanded ? null : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sizeText}>Size</Text>
          <View style={styles.sizeContainer}>
            {data.map(item => (
              <SizeView
                key={item.id}
                title={item.title}
                onPress={() => setSizeSelected(item.title)}
                isSizeSelected={isSizeSelected}
                containerStyle={
                  isSizeSelected === item.title
                    ? styles.containerStyleAlt
                    : styles.containerStyle
                }
                containerText={
                  isSizeSelected === item.title
                    ? styles.containerTextAlt
                    : styles.containerText
                }
              />
            ))}
          </View>
        </View>
        <View style={styles.subContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 14, color: '#909090', marginBottom: 5}}>
                Price
              </Text>
              <Text style={{fontSize: 18, color: '#C67C4E', fontWeight: '700'}}>
                $45,5
              </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('OrderScreen', {data: route.params.data})} style={styles.rowContainer}>
              <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const SizeView = ({title = '-', onPress, containerStyle, containerText}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={containerText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    flex: 1,
  },
  coverImage: {
    marginTop: 30,
    width: 360,
    height: 202,
    alignSelf: 'center',
    borderRadius: 16,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.COLOR_000000,
    marginBottom: 5,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.COLOR_88888,
    marginBottom: 10,
    lineHeight: 28,
    fontWeight: '300',
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSpacing: {
    marginHorizontal: 20,
  },
  iconImage: {
    width: '50%',
    height: '50%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  separator: {
    height: 1.5,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  toggleText: {
    color: '#C67C4E',
    fontWeight: 'bold',
    marginTop: 8,
  },
  sizeText: {
    fontSize: 16,
    color: Colors.COLOR_000000,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStyle: {
    width: 96,
    height: 41,
    borderWidth: 1,
    borderColor: Colors.COLOR_88888,
    borderRadius: 14,
    justifyContent: 'center',
  },
  containerStyleAlt: {
    width: 96,
    height: 41,
    borderWidth: 1,
    borderColor: '#C67C4E',
    backgroundColor: '#F6EBE4',
    borderRadius: 14,
    justifyContent: 'center',
  },
  containerText: {
    alignSelf: 'center',
    fontSize: 16,
    color: Colors.COLOR_000000,
    fontWeight: '700',
  },
  containerTextAlt: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#C67C4E',
    fontWeight: '700',
  },
  subContainer: {
    width: '100%',

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 420,
    height: 200,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  rowContainer: {
    width: 217,
    height: 56,
    backgroundColor: '#C67C4E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
