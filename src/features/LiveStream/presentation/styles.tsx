import { StyleSheet } from 'react-native';
import { AppColors } from '../../../constants/AppColors';
import { ScreenUtils } from '../../../utils/ScreenUtils';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  videoPlayerContainer: {
    flex: 1,
    backgroundColor: AppColors.black,
  },
  toggleIcon: {
    width: 20,
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: ScreenUtils.wp(60),
    height: ScreenUtils.hp(45),
    padding: 20,
    backgroundColor: AppColors.dimBlack,
    borderRadius: 15,
    overflow: "hidden"
  },
  modalButtonsContainer: {
    width: ScreenUtils.wp(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: "flex-end",
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: AppColors.gray,
  },
  logoutButton: {
    backgroundColor: AppColors.red,
  },
  channelListContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: ScreenUtils.wp(30),
    backgroundColor: AppColors.dimBlack,
    zIndex: 1,
  },
  selectedChannelItem: {
    backgroundColor: AppColors.blue, // Highlight color for selected channel
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
    marginTop:ScreenUtils.hp(4),
    borderRadius:10,
    overflow:'hidden'
},
categorySection:{
  height:ScreenUtils.hp(88),
    width: ScreenUtils.wp(22.5),
    backgroundColor: AppColors.dimBlack,
    padding: 10,
    marginBottom:10,
    borderRadius: 10,
    overflow: 'hidden',
    // borderTopRightRadius:0,
    // borderBottomRightRadius:0
},
channelList:{
  height:ScreenUtils.hp(88),
    width: ScreenUtils.wp(22.5),
    backgroundColor: AppColors.dimBlack,
    padding: 10,
    borderRadius: 10,
    marginBottom:10,
    overflow: 'hidden',
    // borderTopLeftRadius:0,
    // borderBottomLeftRadius:0
},
channelItem:{
  padding: 10,
  marginVertical: 2,
  borderRadius: 10,
  overflow: 'hidden',
},
categoryItem:{
  padding: 10,
  marginVertical: 2,
  borderRadius: 10,
  overflow: 'hidden',
},
emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
listSection:{
    width:ScreenUtils.wp(47),
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:'space-evenly',
    marginTop:ScreenUtils.hp(4),
},
seperater:{
  width: '100%',
  height: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  marginTop: 10,
}
});
