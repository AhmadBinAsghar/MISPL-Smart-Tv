import { Platform, StyleSheet } from 'react-native'
import { AppColors } from '../../../constants/AppColors'
import { ScreenUtils } from '../../../utils/ScreenUtils'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: ScreenUtils.wp(4),
        paddingBottom: 10,
        paddingTop: Platform.isTV ? 40 : 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
    },
    logoView: {
        width: ScreenUtils.WinWidth,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodySection: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: ScreenUtils.wp(1),
    },
    listContent: {
        flexGrow: 1,
        paddingHorizontal: 8,
        width: ScreenUtils.wp(40),
        overflow: 'hidden',
    },
    sectionHeader: {
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: 10,
    },
    sectionDivider: {
        width: ScreenUtils.wp(60),
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        marginLeft: 6,
    },
    listItem: {
        width: ScreenUtils.wp(38),
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    streamSection: {
        width: ScreenUtils.wp(47),
        alignSelf: 'center',
        backgroundColor: AppColors.dimBlack,
        justifyContent: 'center',
        marginTop: ScreenUtils.hp(4),
        borderRadius: 10,
        overflow: 'hidden'
    },
    categorySection: {
        height:Platform.isTV  ? ScreenUtils.hp(76):ScreenUtils.hp(74),
        width: ScreenUtils.wp(22.5),
        backgroundColor: AppColors.dimBlack,
        padding: 10,
        marginBottom:10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    channelList: {
        width: ScreenUtils.wp(22.5),
        backgroundColor: AppColors.dimBlack,
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        // borderTopLeftRadius:0,
        // borderBottomLeftRadius:0
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listSection: {
        width: ScreenUtils.wp(47),
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: 'space-evenly',
        marginTop: ScreenUtils.hp(4),
    },
    seperater: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        marginTop: 10,
    }
})