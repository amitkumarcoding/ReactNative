import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BottomNavigator from './bottomNavigator';
import SplashScreen from '../screens/SplashScreen';
import StackFullScreen from '../screens/StackFullScreen';
import CoffeeDetailScreen from '../components/CoffeeDetailScreen';
import CoffeeOrderScreen from '../screens/CoffeeOrderScreen';
import CoffeeMapView from '../components/CoffeeMapView';
import VerticalScrollableCard from '../screens/VerticalScrollableCard';
import CarouselBackgroundAnimation from '../screens/CarouselBackgroundAnimation';
import SharedElementTransitionOne from '../components/SharedElementTransition/SharedElementTransitionOne';
import ToDoComponent from '../components/TodoComponent';
import ReelComponent from '../components/ReelComponent';
import ImageView from '../components/ImageView';
import GalleryView from '../components/GalleryView';
import CarouselWithLeftRightPartialVisible from '../components/CarouselWithLeftRightParticalVisible';
import GalleryCarouselWithLeftRightPartialVisible from '../components/GalleryCarouselWithLeftRightPartialVisible';
import ParallaxView from '../components/ParallexView';
import Leaderboard from '../components/LeaderboardView';
import MultiSlider from '../components/MultiSlider';
import AnimatedPullToRefresh from '../components/AnimatedPullToReferesh';
import HarryPotterUI from '../components/HarryPotterUI';
import HarryPotterView from '../components/HarryPotterView';
import UseStateHooks from '../components/Hooks/useState';
import Grocery from '../components/Grocery';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Todo" component={ToDoComponent} />
      <Stack.Screen name="Grocery" component={Grocery} />
      
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="FullScreen" component={StackFullScreen} />
      <Stack.Screen name="DetailScreen" component={CoffeeDetailScreen} />
      <Stack.Screen name="OrderScreen" component={CoffeeOrderScreen} />
      <Stack.Screen name="MapScreen" component={CoffeeMapView} />
      <Stack.Screen name="VerticalCard" component={VerticalScrollableCard} />

      <Stack.Screen name="Reel" component={ReelComponent} />
      <Stack.Screen name="ImageView" component={ImageView} />
      <Stack.Screen name="GalleryView" component={GalleryView} />
      <Stack.Screen
        name="Carousel"
        component={CarouselWithLeftRightPartialVisible}
      />
      <Stack.Screen
        name="GalleryCarousel"
        component={GalleryCarouselWithLeftRightPartialVisible}
      />
      <Stack.Screen name="ParallaxView" component={ParallaxView} />
      <Stack.Screen name="Leaderboard" component={Leaderboard} />
      <Stack.Screen name="MultiSlider" component={MultiSlider} />
      <Stack.Screen
        name="AnimatedPullToRefresh"
        component={AnimatedPullToRefresh}
      />
      <Stack.Screen name="HarryPotterUI" component={HarryPotterUI} />
      <Stack.Screen name="HarryPotterView" component={HarryPotterView} />
      <Stack.Screen name="UseStateHooks" component={UseStateHooks} />
      <Stack.Screen
        name="CarouselCard"
        component={CarouselBackgroundAnimation}
      />
      <Stack.Screen
        name="SharedElementA"
        component={SharedElementTransitionOne}
      />
      <Stack.Screen
        name="HomeScreen"
        component={BottomNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer
      options={{
        gestureEnabled: false,
      }}>
      <LoginStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
