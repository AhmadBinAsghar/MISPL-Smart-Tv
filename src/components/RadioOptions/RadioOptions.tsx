import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { AppAssets } from '../../constants/AppAssets';
import { AppColors } from '../../constants/AppColors';
import { CustomText } from '../AppText/CustomText';

interface RadioOptionsProps {
  selected: boolean;
  text: string;
  containerStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  onPress?: () => void;
  ref?: any
}

const RadioOptions: React.FC<RadioOptionsProps> = ({ ref, selected, text, containerStyle, iconStyle, onPress }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.8}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={onPress}
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <Image
        source={selected ? AppAssets.Active : AppAssets.inActive}
        style={[styles.icon, iconStyle]}
        tintColor={AppColors.white}
      />
      <CustomText text={text} customStyle={{ marginLeft: isFocused ? 15 : 0 }} />
    </TouchableOpacity>
  );
};

export default React.memo(RadioOptions);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
