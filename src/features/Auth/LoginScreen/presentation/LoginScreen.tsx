import { ScrollView, View, ActivityIndicator, useTVEventHandler, TextInput, Touchable, Linking, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from './styles';
import { CustomText } from '../../../../components/AppText/CustomText';
import Spacer from '../../../../components/Spacer/Spacer';
import { ScreenUtils } from '../../../../utils/ScreenUtils';
import AppInput from '../../../../components/AppInput/AppInput';
import { Wrapper } from '../../../../components/ScreenWrapper/ScreenWrapper';
import { AppColors } from '../../../../constants/AppColors';
import AppButton from '../../../../components/AppButton/AppButton';
import { AppFonts } from '../../../../constants/AppFonts';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../../constants/AppRoutes';
import Helper from '../../../../utils/Helper';
import { useDispatch } from 'react-redux';
import { userDataSave } from '../../../../redux/slices/userDataSlice';
import Logo from '../../../../../assets/images/svg/logo2.svg';
import { fetchLiveVideos } from '../../../Dashboard/functions/DashboardFunc';
import { AppAssets } from '../../../../constants/AppAssets';

const LoginScreen = () => {
  const nav: any = useNavigation();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [error, setError] = useState<{ username: string; password: string }>({ username: '', password: '' });
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const loginButtonRef = useRef<Touchable>(null);
  const [focusedInput, setFocusedInput] = useState<'username' | 'password' | 'login'>('username');

  // const email = 'example@google.com';
  // const subject = 'Need Assistance';
  // const body = 'Hello, I need assistance with...';
  const phoneNumber1 = '+92311-1164788';
  const phoneNumber2 = '+9261-2080247';

  const openWhatsApp = (phoneNumber:string) => {
    let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url)
      .catch(() => {
        Alert.alert('Looks like WhatsApp is not installed on your device.');
      });
  };

  const handleTVRemote = (evt: any) => {
      if (!evt) return;
      switch (evt.eventType) {
          case 'down':
              if (focusedInput === 'username') setFocusedInput('password');
              else if (focusedInput === 'password') setFocusedInput('login');
              break;
          case 'up':
              if (focusedInput === 'login') setFocusedInput('password');
              else if (focusedInput === 'password') setFocusedInput('username');
              break;
          case 'select':
          case 'playPause':
              if (focusedInput === 'username') {
                  usernameRef.current?.focus();
              } else if (focusedInput === 'password') {
                  passwordRef.current?.focus();
              } else if (focusedInput === 'login') {
                  handleLogin();
              }
              break;
      }
  };

  useTVEventHandler(handleTVRemote);

  React.useEffect(() => {
      setTimeout(() => {
          usernameRef.current?.focus();
      }, 500);
  }, []);

  const validateFields = () => {
    let valid = true;
    const newError = { username: '', password: '' };

    if (Helper.isEmptyString(userName)) {
      newError.username = 'Username is required*';
      valid = false;
    }

    if (password.trim().length < 4) {
      newError.password = 'Password must be at least 4 characters*';
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const fetchData = async () => {
    setLoading(true);
    const { channels }: any = await fetchLiveVideos(userName, password);
    if (channels?.length > 0) {
      setLoading(false);
      dispatch(userDataSave({ username: userName, password: password }));
      Helper.resetAndGo(nav, AppRoutes.dashboardScreen);
    } else {
      setLoading(false);
      setError({ username: '', password: 'Invalid credentials. Please check your username and password*' });
      usernameRef.current?.focus();
      setFocusedInput('username');
    }
  };

  const handleLogin = () => {
    if (validateFields()) {
      fetchData();
    }else{
      usernameRef.current?.focus();
      setFocusedInput('username');
    }
  };

  return (
      <Wrapper colors={[AppColors.blue, AppColors.purple, AppColors.pink]}>
        <View style={styles.container}>
          <View style={styles.partition}>
            <View style={styles.logoSection}>
              <Logo width={ScreenUtils.wp(20)} height={ScreenUtils.hp(18)} />
            </View>
            <ScrollView
              overScrollMode='never'
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              style={styles.formSection}
              contentContainerStyle={styles.formContent}
              showsVerticalScrollIndicator={false}
            >
              <CustomText text="Enter Your Login Details" size={24} font={AppFonts.bold} customStyle={{ alignSelf: 'center' }} />
              <Spacer height={ScreenUtils.hp(10)} />

              <AppInput
                inputRef={usernameRef}
                isFocused={focusedInput === 'username'}
                value={userName}
                autoFocus={true}
                placeholder="Username"
                onChangeText={(text) => {
                  setUserName(text);
                  if (text.trim().length > 0) {
                    setError((prev) => ({ ...prev, username: '' }));
                  }
                }}
                returnKeyType="next"
                onSubmitEditing={() =>{ passwordRef?.current?.focus();setFocusedInput('password')}}
              />
              {error.username && <CustomText text={error.username} size={12} customStyle={{ alignSelf: 'flex-start' }} />}

              <AppInput
                inputRef={passwordRef}
                value={password}
                isFocused={focusedInput === 'password'}
                placeholder="Password"
                onChangeText={(text) => {
                  setPassword(text);
                  if (text.trim().length >= 4) {
                    setError((prev) => ({ ...prev, password: '' }));
                  }
                }}
                secureTextEntry={true}
                returnKeyType="done"
                onSubmitEditing={() => {setFocusedInput('login')}}
              />
              {error.password && <CustomText text={error.password} size={12} customStyle={{ alignSelf: 'flex-start' }} />}

              <AppButton
                ref={loginButtonRef}
                isFocused={focusedInput === 'login'}
                text="Sign in"
                onPress={handleLogin}
                textColor={AppColors.black}
              />
              <CustomText text="Don’t have login credentials? Please reach out to MISPL Support for assistance." size={12} customStyle={{ alignSelf: 'flex-start' }} />
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: ScreenUtils.hp(1) }}>
             <View>
             <CustomText text="Support :  " size={12} font={AppFonts.bold} customStyle={{ alignSelf: 'flex-start' }} />
              <TouchableOpacity onPress={()=>openWhatsApp(phoneNumber2)} activeOpacity={0.8} style={styles.connections}>
              <Image source={AppAssets.whatsapp} style={{width:14,height:14,marginRight:5}} tintColor={AppColors.white} resizeMode="contain" />
              <CustomText text={phoneNumber2} size={12} customStyle={{ alignSelf: 'flex-start' }} />
              </TouchableOpacity>
              <Spacer height={ScreenUtils.hp(1)} />
              <TouchableOpacity onPress={()=>openWhatsApp(phoneNumber1)} activeOpacity={0.8} style={styles.connections}>
              <Image source={AppAssets.whatsapp} style={{width:14,height:14,marginRight:5}} tintColor={AppColors.white} resizeMode="contain" />
              <CustomText text={phoneNumber1} size={12} customStyle={{ alignSelf: 'flex-start' }} />
              </TouchableOpacity>
             </View>
             <Spacer width={ScreenUtils.wp(4)} />
              {/* <TouchableOpacity onPress={handleEmailPress} activeOpacity={0.8} style={styles.connections}>
              <CustomText text="Email:  " size={12} font={AppFonts.bold} customStyle={{ alignSelf: 'flex-start' }} />
              <CustomText text={email} size={12} customStyle={{ alignSelf: 'flex-start' }} />
              </TouchableOpacity> */}
              <TouchableOpacity activeOpacity={1} style={styles.connections}>
              <CustomText text="UAN :  " size={12} font={AppFonts.bold} customStyle={{ alignSelf: 'flex-start' }} />
              <CustomText text={"03-111-1MIPTV"} size={12} customStyle={{ alignSelf: 'flex-start' }} />
              </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

        {loading && (
          <View style={{ flex: 1, position: 'absolute', backgroundColor: AppColors.dimBlack, width: ScreenUtils.fullWidth, height: ScreenUtils.fullHeight, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={AppColors.white} />
          </View>
        )}
      </Wrapper>
  );
};

export default LoginScreen;