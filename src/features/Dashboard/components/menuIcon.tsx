import { TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { ScreenUtils } from '../../../utils/ScreenUtils';
import { AppColors } from '../../../constants/AppColors';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  ref?: any;
  onPress: CallableFunction;
  children?: React.ReactNode;
  customStyle?: ViewStyle; 
}
const MenuIcon = ({ ref, onPress, children, customStyle}: Props) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  return (
    <TouchableOpacity
      ref={ref}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      activeOpacity={0.8}
      style={[
        {
          borderRadius: 10,
          borderWidth: isFocused ? 2 : 1,
          borderColor: isFocused ? AppColors.white : 'rgba(255,255,255,0.3)',
          margin: ScreenUtils.wp(0.9),
          overflow: 'hidden',
        },
        customStyle,
      ]}
      onPress={() => { onPress() }}
      focusable
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.06)']}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default MenuIcon