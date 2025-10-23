import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { CustomText } from '../../../components/AppText/CustomText'
import { AppColors } from '../../../constants/AppColors'
import { ScreenUtils } from '../../../utils/ScreenUtils'

const ButtonControll = ({ autofocus = false, isFocused = false, onPress, icon, tooltipText = '', width = 40, height = 40, ref }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      ref={ref}
      style={{ alignItems: 'center', margin: 3 }}
      hasTVPreferredFocus
      onLongPress={() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1200);
      }}
      onPress={() => {
        onPress();
      }}
    >
      {tooltipText && showTooltip && (
        <View style={styles.tooltipContainer}>
          <CustomText text={tooltipText} size={10} textAlign='center' />
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.button,
          { width: width, height: height, marginHorizontal: ScreenUtils.wp(2), borderWidth: isFocused ? 3 : 1, borderColor: isFocused ? AppColors.white : 'rgba(255,255,255,0.3)', },
        ]}
        onLongPress={() => {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 1200);
        }}
        // focusable={true}
        onPress={() => {
          onPress();
        }}
      >
        <LinearGradient
          colors={['rgba(102, 101, 101, 0.47)', 'rgba(102, 102, 102, 0.63)']}
          style={styles.gradient}
        >
          <Image source={icon} resizeMode="contain" tintColor={AppColors.white} style={styles.icon} />
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ButtonControll;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 1,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  tooltipContainer: {
    position: 'absolute',
    top: -30, // Position above the button
    backgroundColor: AppColors.dimBlack,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
