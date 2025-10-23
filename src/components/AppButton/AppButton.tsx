import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { CustomText } from '../AppText/CustomText';
import { AppColors } from '../../constants/AppColors';
import { ScreenUtils } from '../../utils/ScreenUtils';
import { AppFonts } from '../../constants/AppFonts';

interface AppButtonProps {
  text: string;
  onPress?: () => void;
  textColor?: string;
  width?: number;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  ref?:any
  isFocused?: boolean
}

export const AppButton: React.FC<AppButtonProps> = ({
  text,
  ref=null,
  onPress = () => {},
  textColor = AppColors.black,
  width = ScreenUtils.wp(45),
  containerStyle,
  buttonStyle,
  isFocused = false,
}) => {
  const [isBtnFocused,setIsFocused] = useState<boolean>(false)
  return (
    <View 
    onBlur={() => setIsFocused(false)}
    onFocus={() => setIsFocused(true)}
    style={[styles.container, { width }, containerStyle]}>
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.button,
          { width },
          buttonStyle,
          (isBtnFocused || isFocused) && { backgroundColor: AppColors.blue},
        ]}
      >
        <CustomText text={text} size={16} font={AppFonts.bold} customStyle={{ color:isBtnFocused || isFocused ? AppColors.white : textColor }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    height: 45,
  },
});

export default AppButton;
