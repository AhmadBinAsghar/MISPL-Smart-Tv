import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { AppColors } from '../../../constants/AppColors'
import { CustomText } from '../../../components/AppText/CustomText'

interface Props {
    onPress: CallableFunction
    item: any
    currentChan: string
}
const ChannelItem = ({ onPress, item, currentChan }: Props) => {
    const [isfocused, setIsFocused] = useState<boolean>(false)
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
                styles.channelItem,
                currentChan === item.uri && { backgroundColor: AppColors.blue },
                isfocused && { backgroundColor: AppColors.white },
            ]}
        >
            <CustomText
                text={item.name}
                size={12}
                textTransform="uppercase"
                customStyle={{ color: isfocused ? AppColors.black : AppColors.white }}
            />
        </TouchableOpacity>
    )
}

export default memo(ChannelItem)

const styles = StyleSheet.create({
    channelItem: {
        padding: 10,
        marginVertical: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },
})