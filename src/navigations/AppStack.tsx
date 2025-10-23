import React from 'react'
import AuthStack from './AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from '../constants/AppRoutes';
import SplashScreen from '../features/Splash/presentation/SplashScreen';

const AppStacks = createNativeStackNavigator();
const AppStack = () => {
  return (
    <AppStacks.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_bottom",
      }}>
      <AppStacks.Screen
        name={AppRoutes.splashScreen}
        component={SplashScreen} />
      <AppStacks.Screen
        name={AppRoutes.AppStack}
        component={AuthStack} />
    </AppStacks.Navigator>
  )
}

export default AppStack