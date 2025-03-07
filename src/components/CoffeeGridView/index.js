import {FlatList} from 'react-native';
import React from 'react';
import CoffeeGridContainer from '../CoffeeGridContainer';

const CoffeeGridView = ({navigation}) => {
  const renderItem = ({item}) => {
    const {productName, productDesc, coverImage, rating, productPrice} = item;
    return (
      <CoffeeGridContainer
        backgroundImage={coverImage}
        price={productPrice}
        rating={rating}
        subTitle={productDesc}
        title={productName}
        onContentPress={() => navigation.navigate('DetailScreen', {data: item})}
      />
    );
  };
  return (
    <FlatList
      numColumns={2}
      data={GRID_DATA.data}
      extraData={GRID_DATA.data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{paddingBottom: 100}}
      columnWrapperStyle={{justifyContent: 'space-between'}}
    />
  );
};

export default CoffeeGridView;

const GRID_DATA = {
  status: true,
  message: 'Data fetch successfully',
  data: [
    {
      id: 1,
      productName: 'Caffe Mocha',
      productDesc: 'Rich mocha blend',
      coverImage: require('../../assets/images/coffee1.png'),
      rating: '4.5',
      productPrice: 4.53,
      desc: 'A cappuccino is an approximately 150 ml (5 oz) beverage, made with 25 ml of espresso coffee and 85 ml of fresh milk. The milk is steamed to create a rich, velvety foam, which is layered on top of the espresso. This iconic coffee drink is known for its creamy texture and balanced flavors, offering the perfect harmony between the boldness of espresso and the smoothness of milk. Typically served in a ceramic cup, the foam often acts as a canvas for latte art, enhancing the aesthetic appeal of this classic drink.',
    },
    {
      id: 2,
      productName: 'Latte Macchiato',
      productDesc: 'Layered espresso milk',
      coverImage: require('../../assets/images/coffee2.png'),
      rating: '4.7',
      productPrice: 5.25,
            desc: 'A cappuccino is an approximately 150 ml (5 oz) beverage, made with 25 ml of espresso coffee and 85 ml of fresh milk. The milk is steamed to create a rich, velvety foam, which is layered on top of the espresso. This iconic coffee drink is known for its creamy texture and balanced flavors, offering the perfect harmony between the boldness of espresso and the smoothness of milk. Typically served in a ceramic cup, the foam often acts as a canvas for latte art, enhancing the aesthetic appeal of this classic drink.',

    },
    {
      id: 3,
      productName: 'Caramel Cappuccino',
      productDesc: 'Sweet caramel foam',
      coverImage: require('../../assets/images/coffee3.png'),
      rating: '4.8',
      productPrice: 4.95,
            desc: 'A cappuccino is an approximately 150 ml (5 oz) beverage, made with 25 ml of espresso coffee and 85 ml of fresh milk. The milk is steamed to create a rich, velvety foam, which is layered on top of the espresso. This iconic coffee drink is known for its creamy texture and balanced flavors, offering the perfect harmony between the boldness of espresso and the smoothness of milk. Typically served in a ceramic cup, the foam often acts as a canvas for latte art, enhancing the aesthetic appeal of this classic drink.',

    },
    {
      id: 4,
      productName: 'Vanilla Cold Brew',
      productDesc: 'Smooth vanilla coffee',
      coverImage: require('../../assets/images/coffee4.png'),
      rating: '4.6',
      productPrice: 4.75,
            desc: 'A cappuccino is an approximately 150 ml (5 oz) beverage, made with 25 ml of espresso coffee and 85 ml of fresh milk. The milk is steamed to create a rich, velvety foam, which is layered on top of the espresso. This iconic coffee drink is known for its creamy texture and balanced flavors, offering the perfect harmony between the boldness of espresso and the smoothness of milk. Typically served in a ceramic cup, the foam often acts as a canvas for latte art, enhancing the aesthetic appeal of this classic drink.',

    },
  ],
};
