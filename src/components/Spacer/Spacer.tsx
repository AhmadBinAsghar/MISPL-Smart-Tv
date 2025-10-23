import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
}

const Spacer: React.FC<SpacerProps> = ({ width = 0, height = 0, style }) => {
  return <View style={[{ width, height }, style]} />;
};

export default Spacer;
