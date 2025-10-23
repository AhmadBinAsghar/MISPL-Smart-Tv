import { StyleSheet } from 'react-native';
import { ScreenUtils } from '../../../utils/ScreenUtils';
import { AppColors } from '../../../constants/AppColors';

export const styles = StyleSheet.create({
  container: {
    width: ScreenUtils.fullWidth,
    height: ScreenUtils.fullHeight,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  fullscreenContainer: {
    width: ScreenUtils.fullWidth,
    height: ScreenUtils.fullHeight,
  },
  video: {
    width: ScreenUtils.wp(65),
    height: ScreenUtils.hp(100),
    alignSelf:"center",
  },
  controlsOverlay: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.37)',
    borderRadius: 50,
  },
  controllicon: {
    width: 20,
    height: 20,
  },
  toggleCategoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    top: 10,
    left: ScreenUtils.wp(6),
    zIndex: 1000,
  },
  resolutioncontainer: {
    position: 'absolute',
    top: ScreenUtils.hp(5),
    alignSelf: 'center',
    height: 30,
    backgroundColor: AppColors.dimBlack,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1000,
  }
});
