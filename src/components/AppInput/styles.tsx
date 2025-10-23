import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../utils/ScreenUtils";
import { AppFonts } from "../../constants/AppFonts";
import { AppColors } from "../../constants/AppColors";

export const styles = StyleSheet.create({
  inputStyle: {
    width: ScreenUtils.wp(45),
    color: AppColors.white,
    borderRadius: 10,
    height: 45,
    fontSize: 16,
    paddingVertical: -10,
    fontFamily: AppFonts.medium,
    paddingHorizontal: 12,
  },
  container: {
    justifyContent: "center",
    width: ScreenUtils.wp(45),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.white,
    height: 45,
    marginVertical: 5,
    paddingHorizontal: 8,
    color:AppColors.white
  },
  searhInputContainer: {
    width: ScreenUtils.wp(55),
    alignSelf: "center",
    flexDirection: "row",
    height: 45,
    borderRadius: 10,
    backgroundColor: AppColors.white,
    borderColor: AppColors.white,
    borderWidth: 0.75,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: AppFonts.regular,
    // marginHorizontal: 8,
    color: AppColors.white,
  },
  closeButtonContainer: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.75,
    borderColor: AppColors.gray,
  },
  closeIcon: {
    width: 9,
    height: 9,
    resizeMode: 'contain'
  },
  closeBtnContainer: {
    width: 30,
    height: 30,
    marginRight: -5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
