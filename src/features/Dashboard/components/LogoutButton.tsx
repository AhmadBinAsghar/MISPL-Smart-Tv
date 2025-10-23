import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScreenUtils } from '../../../utils/ScreenUtils'
import LinearGradient from 'react-native-linear-gradient'
import { AppAssets } from '../../../constants/AppAssets'
import Spacer from '../../../components/Spacer/Spacer'
import { CustomText } from '../../../components/AppText/CustomText'
import { AppColors } from '../../../constants/AppColors'

interface Props {
  ref?: any;
  onPress: CallableFunction
}
const LogoutButton = ({ onPress, ref }: Props) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.8}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        marginLeft: ScreenUtils.wp(4.5),
        borderRadius: 10,
        margin: ScreenUtils.wp(0.9),
        overflow: 'hidden',
      }}
      onPress={() => onPress()}>
      <LinearGradient
        colors={['rgba(253, 5, 5, 0.2)', 'rgba(253, 5, 5, 0.2)']}
        style={[
          styles.card,
          { height: 45, borderWidth: isFocused ? 3 : 1, borderColor: 'rgba(253, 5, 5, 0.5)' },
        ]}>
        <Image
          source={AppAssets.logout}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
        <Spacer width={8} />
        <CustomText
          text={'Logout'}
          size={14}
          textAlign="center"
          customStyle={{ color: AppColors.red }}
        />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default LogoutButton

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 5,
    width: ScreenUtils.wp(14),
    height: ScreenUtils.hp(19),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.3)'
  },
})