import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { AppColors } from '../../../constants/AppColors'
import { CustomText } from '../../../components/AppText/CustomText'

interface Props {
    item: any
    selectedCategory: string
    onPress: CallableFunction
}
const CategoryItem = ({ item, onPress, selectedCategory }: Props) => {
    const [focusedCategory, setFocusedCategory] = useState<boolean>(false)
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress()}
            onFocus={() => setFocusedCategory(true)}
            onBlur={() => setFocusedCategory(false)}
            style={[
                styles.categoryItem,
                selectedCategory === item.title && { backgroundColor: AppColors.blue },
                focusedCategory && { backgroundColor: AppColors.white },
            ]}
        >
            <CustomText
                text={`${item.title} (${item.data[0].length})`}
                size={13}
                textTransform='uppercase'
                customStyle={{ color: focusedCategory ? AppColors.black : AppColors.white }}
            />
        </TouchableOpacity>
    )
}

export default memo(CategoryItem)

const styles = StyleSheet.create({
    categoryItem: {
        padding: 10,
        marginVertical: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },
})