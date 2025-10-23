import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import KeepAwake from '@sayem314/react-native-keep-awake';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  AppState,
  BackHandler,
  FlatList,
  ImageBackground,
  Modal,
  NativeModules,
  Platform,
  View,
} from 'react-native';
import AppButton from '../../../components/AppButton/AppButton';
import { CustomText } from '../../../components/AppText/CustomText';
import Wrapper from '../../../components/ScreenWrapper/ScreenWrapper';
import { AppAssets } from '../../../constants/AppAssets';
import { AppColors } from '../../../constants/AppColors';
import { AppFonts } from '../../../constants/AppFonts';
import { AppRoutes } from '../../../constants/AppRoutes';
import Helper from '../../../utils/Helper';
import { ScreenUtils } from '../../../utils/ScreenUtils';
import VideoPlayer from '../components/VideoPlayer';
import { styles } from './styles';
import CategoryItem from '../../StreamDetailsScreen/components/CategoryItem';
import ChannelItem from '../../StreamDetailsScreen/components/ChannelItem';
const { PipModule } = NativeModules;

const LiveStreamScreen = () => {
  const nav = useNavigation();
  const { url, name, channals, sectionData } = useRoute().params as any;
  const [isPip, setIsPip] = useState(false);
  const initialIndex = useMemo(() => channals?.findIndex((channel: any) => channel?.uri === url), [channals, url]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showPermisionModal, setShowPermisionModal] = useState<boolean>(false);
  const [showChannelList, setShowChannelList] = useState<boolean>(false);
  const { ref, focusSelf, focusKey } = useFocusable({ autoRestoreFocus: true, focusable: true, forceFocus: true, isFocusBoundary: true, focusBoundaryDirections: ['left', 'right'] });
  const CatListRef = useRef<FlatList>(null);
  const ChanListRef = useRef<FlatList>(null);
  const [currentChan, setCurrentChan] = useState(channals[initialIndex]);
  const [selectedCategory, setSelectedCategory] = useState(sectionData[0]?.title || '');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleBackPress = useCallback(() => {
    Helper.resetAndGoWithParams(nav, AppRoutes.StreamDetailsScreen, { url: channals[currentIndex]?.uri ?? '', name: channals[currentIndex]?.name ?? '', channals: channals ?? [], sectionData: sectionData ?? [] });
  }, [nav, currentIndex, channals, sectionData]);

  const hideShowList = useCallback(() => {
    fadeOut();
    setTimeout(() => {
      fadeIn();
    }, 300);
  }, []);

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const enterPiPMode = useCallback(() => {
    PipModule.isPipSupported((isSupported: any) => {
      if (isSupported) {
        PipModule.isPipEnabled((isEnabled: any) => {
          if (isEnabled) {
            setIsPip(true);
            PipModule.enterPipMode();
          } else {
            setIsPip(false);
            setShowPermisionModal(true);
          }
        });
      } else {
        console.log('PiP mode is not supported on this device.');
      }
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (showChannelList) {
        setShowChannelList(false);
        return true;
      } else {
        handleBackPress();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [showChannelList, handleBackPress]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState !== 'active') {
        enterPiPMode();
      } else {
        setIsPip(false);
      }
    });

    return () => appStateListener.remove();
  }, [enterPiPMode]);

  const filteredChannals = useMemo(() => {
    const list = sectionData.find((section: any) =>
      section.title.toLowerCase() === selectedCategory.toLowerCase()
    )?.data || [];
    return list[0] || [];
  }, [sectionData, selectedCategory]);

  const changeVideo = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < filteredChannals.length) {
      setCurrentIndex(newIndex);
      setCurrentChan(filteredChannals[newIndex]);
    }
  }, [filteredChannals]);
  
  useEffect(() => {
    const newIndex = filteredChannals.findIndex((channel: any) => channel.uri === currentChan?.uri);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
  }, [filteredChannals, currentChan]);

  useEffect(() => {
    const foundCategory = sectionData.find((section: any) =>
      section.data.some((channel: any) =>
        channel.some((item: any) => item.uri === currentChan?.uri)
      ));
    if (foundCategory) {
      setSelectedCategory(foundCategory.title);
    }
  }, [currentChan, sectionData]);

  const selectedCategoryIndex = useMemo(() => {
    return sectionData.findIndex((section: any) => section.title === selectedCategory);
  }, [sectionData, selectedCategory]);

  const selectedChannelIndex = useMemo(() => {
    return filteredChannals.findIndex((channel: any) => channel.uri === currentChan?.uri);
  }, [filteredChannals, currentChan]);

  useFocusEffect(
    useCallback(() => {
      if (CatListRef.current && selectedCategoryIndex >= 0) {
        CatListRef.current.scrollToIndex({
          index: selectedCategoryIndex,
          animated: true,
          viewPosition: 0.1,
        });
      }

      if (ChanListRef.current && selectedChannelIndex >= 0) {
        ChanListRef.current.scrollToIndex({
          index: selectedChannelIndex,
          animated: true,
          viewPosition: 0.1,
        });
      }
    }, [selectedCategoryIndex, selectedChannelIndex, showChannelList])
  );

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <KeepAwake />
      <Wrapper colors={[AppColors.blue, AppColors.purple, AppColors.pink]}>
        <View style={[styles.mainContent, { width: ScreenUtils.fullWidth }]}>
          <View style={styles.videoPlayerContainer} ref={ref}>
            <VideoPlayer
              onBackPres={handleBackPress}
              chanName={currentChan ? currentChan?.name : channals[currentIndex]?.name ?? ''}
              uri={currentChan ? currentChan?.uri : channals[currentIndex]?.uri ?? ''}
              handlePipPress={enterPiPMode}
              showlist={showChannelList}
              handleListPress={(show: boolean) => setShowChannelList(show)}
              isPip={isPip}
              onNext={() => changeVideo((currentIndex + 1) % filteredChannals.length)}
              onPrevious={() => changeVideo((currentIndex - 1 + filteredChannals.length) % filteredChannals.length)}
            />
          </View>
          {!isPip && showChannelList && (
            <View style={styles.listSection}>
              <View style={styles.categorySection}>
                <CustomText text="Categories:" size={18} font={AppFonts.bold} />
                <View style={styles.seperater} />
                <FlatList
                  ref={CatListRef}
                  overScrollMode='never'
                  showsVerticalScrollIndicator={false}
                  data={sectionData}
                  contentContainerStyle={{
                    paddingBottom: Platform.isTV ? 25 : 0
                  }}
                  getItemLayout={(data, index) => ({
                    length: 45,
                    offset: 45 * index,
                    index,
                  })}
                  keyExtractor={(item) => item.title}
                  renderItem={({ item }) => (
                    <CategoryItem
                      item={item}
                      selectedCategory={selectedCategory}
                      onPress={() => { setSelectedCategory(item.title); hideShowList() }}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              </View>

              <Animated.View style={[styles.channelList, { opacity: fadeAnim }]}>
                <CustomText text="Channels:" size={18} font={AppFonts.bold} />
                <View style={styles.seperater} />
                <FlatList
                  ref={ChanListRef}
                  overScrollMode='never'
                  showsVerticalScrollIndicator={false}
                  data={filteredChannals}
                  contentContainerStyle={{
                    paddingBottom: Platform.isTV ? 25 : 0
                  }}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <ChannelItem
                      item={item}
                      currentChan={currentChan?.uri}
                      onPress={() => { setCurrentChan(item), setShowChannelList(false); }}
                    />
                  )}
                  getItemLayout={(data, index) => ({
                    length: 40,
                    offset: 40 * index,
                    index,
                  })}
                  ListEmptyComponent={() => (
                    <View style={styles.emptyList}>
                      <CustomText text="No channels available" size={14} />
                    </View>
                  )}
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              </Animated.View>
            </View>
          )}
          {showPermisionModal && (
            <Modal
              visible={showPermisionModal}
              transparent
              animationType="slide"
              onRequestClose={() => setShowPermisionModal(false)}>
              <View style={styles.modalOverlay}>
                <ImageBackground
                  source={AppAssets.catbg}
                  resizeMode="cover"
                  style={styles.modalContent}>
                  <CustomText
                    text="Enable PiP Mode!"
                    size={20}
                    font={AppFonts.bold}
                  />
                  <CustomText
                    text={`Allow 'Display over other apps' and 'Picture-in-Picture' in settings.`}
                    size={16}
                    customStyle={{ marginTop: 2 }}
                  />
                  <View style={styles.modalButtonsContainer}>
                    <AppButton
                      text="Cancel"
                      onPress={() => setShowPermisionModal(false)}
                      width={ScreenUtils.wp(15)}
                      textColor={AppColors.white}
                      buttonStyle={styles.logoutButton}
                    />
                    <AppButton
                      text="Open Settings"
                      onPress={() => {
                        PipModule.enterPipMode();
                        setShowPermisionModal(false);
                      }}
                      width={ScreenUtils.wp(15)}
                    />
                  </View>
                </ImageBackground>
              </View>
            </Modal>
          )}
        </View>
      </Wrapper>
    </FocusContext.Provider>
  );
};

export default React.memo(LiveStreamScreen);