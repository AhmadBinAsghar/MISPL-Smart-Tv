import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from '../constants/AppRoutes';
import LoginScreen from '../features/Auth/LoginScreen/presentation/LoginScreen';
import DashboardScreen from '../features/Dashboard/presentation/DashboardScreen';
import DevicesOptionScreen from '../features/Auth/DevicesOption/presentation/DevicesOptionScreen';
import LiveStreamScreen from '../features/LiveStream/presentation/LiveStreamScreen';
import { useSelector } from 'react-redux';
import StreamDetailsScreen from '../features/StreamDetailsScreen/presentation/StreamDetailsScreen';

const AuthStacks = createNativeStackNavigator();
const AuthStack = () => {
  const userInfo = useSelector((state:any) => state.userData.userData);
  return (
    <AuthStacks.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
    }}
    initialRouteName={userInfo.username && userInfo.username != undefined ? AppRoutes.dashboardScreen : AppRoutes.devicesOptions}
    >
      <AuthStacks.Screen
        name={AppRoutes.devicesOptions}
        component={DevicesOptionScreen}
      />
      <AuthStacks.Screen
        name={AppRoutes.loginScreen}
        component={LoginScreen}
      />
      <AuthStacks.Screen
        name={AppRoutes.dashboardScreen}
        component={DashboardScreen}
      />
      <AuthStacks.Screen
        name={AppRoutes.liveStream}
        component={LiveStreamScreen}
      />
      <AuthStacks.Screen
        name={AppRoutes.StreamDetailsScreen}
        component={StreamDetailsScreen}
      />
    </AuthStacks.Navigator>
  )
}

export default AuthStack