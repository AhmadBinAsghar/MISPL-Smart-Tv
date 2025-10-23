import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import Wrapper from '../../../../components/ScreenWrapper/ScreenWrapper';
import { AppColors } from '../../../../constants/AppColors';
import { styles } from './styles';
import { CustomText } from '../../../../components/AppText/CustomText';
import { AppFonts } from '../../../../constants/AppFonts';
import Spacer from '../../../../components/Spacer/Spacer';
import RadioOptions from '../../../../components/RadioOptions/RadioOptions';
import AppButton from '../../../../components/AppButton/AppButton';
import { ScreenUtils } from '../../../../utils/ScreenUtils';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../../constants/AppRoutes';
import Logo from '../../../../../assets/images/svg/logo2.svg';

const DevicesOptionScreen = () => {
  const nav: any = useNavigation();
  const deviceType = Platform.isTV ? 'TV' : 'Mobile';
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDevice(deviceType);
  }, [deviceType]);

  // Focus handling for options
  const { ref: mobileRef, focused: mobileFocused, focusKey } = useFocusable({ focusable: true });
  const { ref: tvRef, focused: tvFocused } = useFocusable({ focusable: true });
  const { ref: buttonRef, focused: buttonFocused } = useFocusable({ focusable: true });

  return (
    <FocusContext.Provider value={focusKey}>
      <Wrapper colors={[AppColors.blue, AppColors.purple, AppColors.pink]}>
        <View style={styles.container}>
          <View style={styles.logoSection}>
            <Logo width={ScreenUtils.wp(15)} height={ScreenUtils.hp(15)} />
          </View>
          <View style={styles.bodySection}>
            <CustomText text="Device Option" size={22} font={AppFonts.bold} />
            <Spacer height={12} />
            <CustomText
              text={`We detected your device type is ${deviceType}\nPlease choose the correct one for better performance`}
              size={16}
              lineHeight={25}
            />
            <View style={styles.radioSection}>
              <RadioOptions
                ref={mobileRef}
                selected={selectedDevice === 'Mobile'}
                text="Mobile"
                onPress={() => setSelectedDevice('Mobile')}
              />
              <Spacer height={8} />
              <RadioOptions
                ref={tvRef}
                selected={selectedDevice === 'TV'}
                text="TV"
                onPress={() => setSelectedDevice('TV')}
              />
            </View>
            <AppButton
              ref={buttonRef}
              text="Continue"
              width={ScreenUtils.wp(15)}
              containerStyle={{ alignSelf: 'flex-end' }}
              onPress={() => nav.navigate(AppRoutes.loginScreen)}
            />
          </View>
        </View>
      </Wrapper>
    </FocusContext.Provider>

  );
};

export default DevicesOptionScreen;
