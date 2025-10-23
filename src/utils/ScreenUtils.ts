import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ScreenUtils = {
    fullWidth: width,
    fullHeight: height,
    WinWidth:windowWidth,
    WinHeight:windowHeight,
  wp: (percent: number) => wp(percent),
  hp: (percent: number) => hp(percent),
};
