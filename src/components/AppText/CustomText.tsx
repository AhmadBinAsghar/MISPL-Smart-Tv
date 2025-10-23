import React from 'react';
import {StyleSheet, Text, TextStyle, TextProps, StyleProp} from 'react-native';
import {AppFonts} from '../../constants/AppFonts';

interface CustomTextProps extends TextProps {
  text: string;
  customStyle?: StyleProp<TextStyle>;
  font?: string;
  lineHeight?: number;
  overflow?: 'hidden' | 'visible' | 'scroll';
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'auto';
  size?: number;
}

export const CustomText: React.FC<CustomTextProps> = ({
  text,
  customStyle,
  size = 14,
  font = AppFonts.regular,
  lineHeight,
  overflow,
  letterSpacing,
  textTransform,
  textAlign,
  ...restProps
}) => {
  return (
    <Text
      {...restProps}
      maxFontSizeMultiplier={1}
      allowFontScaling={false}
      style={[
        styles.normalText,
        customStyle,
        {
          fontSize: size,
          fontFamily: font,
          lineHeight: lineHeight,
          letterSpacing: letterSpacing,
          textTransform: textTransform,
          overflow: overflow,
          textAlign: textAlign,
        },
      ]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  normalText: {
    color: '#fff',
  },
});
