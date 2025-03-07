import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import SettingScreen from '../../screens/SettingScreen';
import WithInBottomScreen from '../../screens/WithInBottomScreen';

const Stack = createStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SettingPage"
        component={SettingScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="WithInBottomScreen" component={WithInBottomScreen} />
    </Stack.Navigator>
  );
}
