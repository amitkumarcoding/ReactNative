import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import ProfileScreen from '../../screens/ProfileScreen';
import WithInBottomScreen from '../../screens/WithInBottomScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ProfilePage"
        component={ProfileScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="WithInBottomScreen" component={WithInBottomScreen} />
    </Stack.Navigator>
  );
}
