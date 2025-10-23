import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { AppColors } from '../../../constants/AppColors'
import LinearGradient from 'react-native-linear-gradient'
import { ScreenUtils } from '../../../utils/ScreenUtils'
import { CustomText } from '../../../components/AppText/CustomText'

interface Props {
    item:any
    selectedCategory:string
    onPress : CallableFunction
    filterType: 'alphabet' | 'number'
}
const DrawerCategoryItem = ({item,selectedCategory,onPress,filterType}:Props) => {
    const [isFocused,setIsFocused] = useState<boolean>(false);
  return (
    <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.bubble,
              selectedCategory === item && styles.selectedBubble,
              isFocused && { borderWidth: 2, borderColor: AppColors.white },
            ]}
            onPress={() => onPress()}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.06)']}
              style={[
                styles.gradientBubble,
                filterType === 'alphabet'
                  ? { width: ScreenUtils.wp(5), height: ScreenUtils.hp(10) }
                  : { paddingVertical: ScreenUtils.wp(1.5), paddingHorizontal: ScreenUtils.hp(4) },
              ]}
            >
              <CustomText text={item} textTransform={filterType === 'alphabet' ? undefined : 'capitalize'} />
            </LinearGradient>
          </TouchableOpacity>
  )
}

export default memo(DrawerCategoryItem)

const styles = StyleSheet.create({
    bubble: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        margin: ScreenUtils.wp(0.5),
        overflow: 'hidden',
      },
      selectedBubble: {
        backgroundColor: AppColors.dimBlack,
      },
      gradientBubble: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
})