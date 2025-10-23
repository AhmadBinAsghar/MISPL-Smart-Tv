import React from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../../constants/AppColors';
import { AppAssets } from '../../constants/AppAssets';

interface WrapperProps {
  children: React.ReactNode;
  colors?: string[];
  customStyle?:ViewStyle;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, colors,customStyle }) => {
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.4, 1]}
        colors={colors}
        style={[styles.gradient]}
      >
        <View style={[{flex:1, width:"100%",height:"100%",backgroundColor:AppColors.dimBlack},customStyle]}>
        {children}
        </View>
      </LinearGradient> */}
      <ImageBackground
       source={AppAssets.Homepage}
       resizeMode='cover'
       style={[{flex:1, width:"100%",height:"100%",backgroundColor:AppColors.dimBlack},customStyle]}
       >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

export default Wrapper;
