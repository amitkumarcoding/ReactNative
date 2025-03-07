import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import DetailScreen from '../../screens/DetailScreen';
import WithInBottomScreen from '../../screens/WithInBottomScreen';

const Stack = createStackNavigator();

export default function DetailStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DetailPage"
        component={DetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="WithInBottomScreen" component={WithInBottomScreen} />
    </Stack.Navigator>
  );
}
