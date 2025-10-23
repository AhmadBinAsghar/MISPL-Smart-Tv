import { Platform, StyleSheet } from "react-native";
import { ScreenUtils } from "../../../utils/ScreenUtils";
import { AppColors } from "../../../constants/AppColors";

export const styles = StyleSheet.create({
  blurContainer: {
    height: ScreenUtils.fullHeight,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryBubble: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  logoutContainer: {
    marginLeft: ScreenUtils.wp(5),
    borderRadius: 10,
    margin: ScreenUtils.wp(0.9),
    overflow: 'hidden',
  },
  separator: {
    width: '80%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: ScreenUtils.wp(5),
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    marginLeft: 20,
    width: ScreenUtils.wp(6),
    height: ScreenUtils.wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  headerText: {
    color: AppColors.gray,
    marginLeft: 40,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingTop: 6,
    paddingBottom: ScreenUtils.hp(2),
    marginLeft: ScreenUtils.wp(4),
  },
  loadingContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: ScreenUtils.wp(60),
    height: Platform.isTV ? ScreenUtils.hp(30) : ScreenUtils.hp(45),
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
    marginTop: 20,
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
});
