import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../constants/AppRoutes';
import Helper from '../../../utils/Helper';
import Wrapper from '../../../components/ScreenWrapper/ScreenWrapper';
import { AppColors } from '../../../constants/AppColors';
import Logo from '../../../../assets/images/svg/logo2.svg';
import { Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const SplashScreen = () => {
  const nav: any = useNavigation();

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const [showShimmer, setShowShimmer] = useState<boolean>(false);

  useEffect(() => {
    // Start the fade-in and scale animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Start the shimmer effect after the initial animation
      setShowShimmer(true);
      startShimmer();
    });
  }, []);

  const startShimmer = () => {
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
      // Optional: Add a callback when the animation finishes
      setShowShimmer(false)
      setTimeout(() => {
        Helper.resetAndGo(nav,AppRoutes.AppStack);
    }, 500);
    });
  };

  const shimmerTranslateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-90, 90],
  });

  return (
    <Wrapper
      colors={[AppColors.blue, AppColors.purple, AppColors.pink]}
      customStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        }}
      >
        <Logo width={200} height={200} />
        <MaskedView
          style={{ height: 200, width: 200,position:'absolute',zIndex:999 }}
          maskElement={
          <Logo width={200} height={200} />
          }
        >
          <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: [{ translateX: shimmerTranslateX }],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {showShimmer && <LinearGradient
                colors={['transparent', 'rgba(14, 13, 13, 0.39)', 'transparent']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                  width: 60,
                  height: 200,
                  alignSelf: 'center',
                  overflow: 'hidden',
                  transform: [{ rotate: '25deg' }]
                }}
              />}
            </Animated.View>
        </MaskedView>
      </Animated.View>
    </Wrapper>
  );
};

export default SplashScreen;
