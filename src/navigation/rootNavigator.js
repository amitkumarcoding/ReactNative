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
import ListScreen from '../screens/ListScreen';
import RouteName from './RouteName';
import TimerComponent from '../components/Timer';
import Throttling from '../components/Throttling';
import DebouncingComponent from '../components/Debouncing';
import LanguageComponent from '../components/LanguageComponent';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name={RouteName.TODO} component={ToDoComponent} />
      <Stack.Screen name={RouteName.GROCERY} component={Grocery} />

      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="FullScreen" component={StackFullScreen} />
      <Stack.Screen name="DetailScreen" component={CoffeeDetailScreen} />
      <Stack.Screen name="OrderScreen" component={CoffeeOrderScreen} />
      <Stack.Screen name={RouteName.LANGUAGE} component={LanguageComponent} />
      <Stack.Screen name={RouteName.CAROUSEL_LEFT_RIGHT} component={CarouselWithLeftRightPartialVisible} />
      <Stack.Screen name="MapScreen" component={CoffeeMapView} />
      <Stack.Screen
        name={RouteName.DEBOUNCING}
        component={DebouncingComponent}
      />
      <Stack.Screen name={RouteName.THROTTLING} component={Throttling} />
      <Stack.Screen name={RouteName.TIMER} component={TimerComponent} />
      <Stack.Screen
        name={RouteName.VERTICAL_CARD}
        component={VerticalScrollableCard}
      />

      <Stack.Screen name={RouteName.REEL} component={ReelComponent} />
      <Stack.Screen name={RouteName.IMAGE_VIEW} component={ImageView} />
      <Stack.Screen name={RouteName.GALLERY_VIEW} component={GalleryView} />
      <Stack.Screen
        name={RouteName.CAROUSEL}
        component={CarouselWithLeftRightPartialVisible}
      />
      <Stack.Screen
        name={RouteName.GALLERY_CAROUSEL}
        component={GalleryCarouselWithLeftRightPartialVisible}
      />
      <Stack.Screen name={RouteName.PARALLAX_VIEW} component={ParallaxView} />
      <Stack.Screen name="Leaderboard" component={Leaderboard} />
      <Stack.Screen name={RouteName.MULTI_SLIDER} component={MultiSlider} />
      <Stack.Screen
        name={RouteName.ANIMATED_PULL_TO_REFRESH}
        component={AnimatedPullToRefresh}
      />
      <Stack.Screen
        name={RouteName.HARRY_POTTER_UI}
        component={HarryPotterUI}
      />
      <Stack.Screen
        name={RouteName.HARRY_POTTER_VIEW}
        component={HarryPotterView}
      />
      <Stack.Screen name="UseStateHooks" component={UseStateHooks} />
      <Stack.Screen
        name={RouteName.CAROUSEL_CARD}
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
