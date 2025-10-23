import { StyleSheet } from 'react-native'
import { ScreenUtils } from '../../../../utils/ScreenUtils'
import { AppColors } from '../../../../constants/AppColors'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ScreenUtils.fullWidth,
        height: ScreenUtils.fullHeight,
        paddingHorizontal: ScreenUtils.hp(10),
    },
    logoSection: {
        width: ScreenUtils.fullWidth,
        marginVertical: 10,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: AppColors.gray
    },
    bodySection: {
        width: ScreenUtils.wp(75),
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: AppColors.dimBlack,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 20
    },
    radioSection: {
        marginVertical: 10,
    }
})