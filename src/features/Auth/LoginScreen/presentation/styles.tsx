import { StyleSheet } from 'react-native'
import { ScreenUtils } from '../../../../utils/ScreenUtils'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ScreenUtils.fullWidth,
        height: ScreenUtils.fullHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    partition:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        width:ScreenUtils.fullWidth,
        paddingHorizontal:ScreenUtils.wp(4),
    },
    logoSection:{
        flex:1,
        alignItems:'center',
        justifyContent:"center"
    },
    formSection:{
        flex:1,
    },
    formContent:{
        flexGrow:1,
        alignItems:"flex-start",
        paddingVertical:ScreenUtils.hp(8),
        paddingHorizontal:8,
    },
    connections:{
        flexDirection:"row",
        marginTop:2,
    }
})