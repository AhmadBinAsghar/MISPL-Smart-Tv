import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  BackHandler,
  ImageBackground,
  Modal,
  Platform,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { useSelector } from 'react-redux';
import Filter from '../../../../assets/images/svg/filter.svg';
import Logo from '../../../../assets/images/svg/logo2.svg';
import { CustomText } from '../../../components/AppText/CustomText';
import Wrapper from '../../../components/ScreenWrapper/ScreenWrapper';
import { AppAssets } from '../../../constants/AppAssets';
import { AppColors } from '../../../constants/AppColors';
import { AppFonts } from '../../../constants/AppFonts';
import { AppRoutes } from '../../../constants/AppRoutes';
import { ScreenUtils } from '../../../utils/ScreenUtils';
import CategoryScrollView from '../components/CategroyScrollView';
import { fetchLiveVideos } from '../functions/DashboardFunc';
import { styles } from './styles';
import MenuIcon from '../components/menuIcon';
import KeepAwake from '@sayem314/react-native-keep-awake';
import AppButton from '../../../components/AppButton/AppButton';
import RNExitApp from 'react-native-exit-app';
import SearchInput from '../components/SearchInput';

const DashboardScreen = () => {
  const nav: any = useNavigation();
  const route: any = useRoute();
  const { isPipActive, videoUri } = route.params ?? {};
  const [selectedChannel, setSelectedChannel] = useState(videoUri ?? '');
  const userInfo = useSelector((state: any) => state.userData.userData);
  const [search, setSearch] = useState('');
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [liveVideos, setLiveVideos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoriesData, setCategoryData] = useState();
  const [byCategory, setByCategory] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const { ref: pipRef, focused: pipFocused } = useFocusable();
  const { ref: filterRef } = useFocusable();
  const { ref: sectionListRef, focusKey: sectionListFocusKey } = useFocusable();
  const itemsPerRow = useMemo(() => Math.max(6, Math.floor(ScreenUtils.wp(100) / 120)), []);

  const fetchData = useCallback(async () => {
    try {
      const { channels, categoryCount }: any = await fetchLiveVideos(userInfo?.username, userInfo?.password);
      if (channels) setLiveVideos(channels);
      if (categoryCount) setCategoryData(categoryCount);
    } catch (error) {
      console.error('Error fetching live videos:', error);
    } finally {
      setLoading(false);
    }
  }, [userInfo?.username, userInfo?.password]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredChannels = useMemo(() => {
    if (!Array.isArray(liveVideos)) return [];

    if (selectedCategory === 'All') {
      return liveVideos;
    } else if (selectedCategory === '#') {
      return liveVideos.filter((item: any) => /[0-9]/.test(item?.name?.charAt(0)));
    } else {
      return liveVideos.filter(
        (item: any) => item?.name?.charAt(0)?.toUpperCase() === selectedCategory?.toUpperCase(),
      );
    }
  }, [liveVideos, selectedCategory]);

  const groupChannelsByCategory = useCallback((channels: { [x: string]: any; }) => {
    return Object.keys(channels).map((category) => ({
      title: category,
      data: [channels[category]],
    }));
  }, []);

  const groupChannelsByAlphabet = useCallback(
    (channels: any[]) => {
      const groupedBySection: any = {};
      channels.forEach((channel: { name: string; }) => {
        const firstChar = channel?.name?.charAt(0)?.toUpperCase();
        const sectionKey = /[0-9]/.test(firstChar) ? '#' : firstChar;
        groupedBySection[sectionKey] = groupedBySection[sectionKey] || [];
        groupedBySection[sectionKey].push(channel);
      });
      return Object.keys(groupedBySection)
        .sort((a, b) => (a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b)))
        .map((sectionKey) => ({
          title: sectionKey,
          data: chunkArray(groupedBySection[sectionKey], itemsPerRow),
        }));
    },
    [itemsPerRow],
  );

  const categorizedChannels = useMemo(() => {
    const result: any = {};
    liveVideos.forEach((channel: any) => {
      const category = channel?.category;
      result[category] = result[category] || [];
      result[category].push(channel);
    });
    return result;
  }, [liveVideos]);

  const filterCategorizedChannels = useCallback(() => {
    if (selectedCategory === 'All') {
      return groupChannelsByCategory(categorizedChannels);
    }
    return groupChannelsByCategory(categorizedChannels).filter(
      (video) => video?.title?.split(' ')[0]?.toUpperCase() === selectedCategory?.split(' ')[0]?.toUpperCase(),
    );
  }, [categorizedChannels, selectedCategory, groupChannelsByCategory]);

  const data = useMemo(() => filterCategorizedChannels(), [filterCategorizedChannels]);

  const sectionedData = useMemo(() => {
    const structuredData = byCategory ? data : groupChannelsByAlphabet(filteredChannels);
    if (!structuredData || structuredData.length === 0) return [];

    if (search?.trim()?.length > 0) {
      return structuredData
        .map((section) => ({
          title: section?.title ?? '',
          data: Array.isArray(section?.data)
            ? section?.data?.map((group) =>
              group?.filter((item: { name: string; }) => item?.name?.toLowerCase()?.includes(search?.toLowerCase()))
            )?.filter((group) => group?.length > 0)
            : [],
        }))
        .filter((section) => section?.data?.length > 0);
    }
    return structuredData;
  }, [byCategory, data, search, filteredChannels, groupChannelsByAlphabet]);

  useEffect(() => {
    const backAction = () => {
      if (showCategory) {
        setShowCategory(false);
        return true;
      } else {
        setShowExitModal(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showCategory]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      setPaused(nextAppState !== 'active');
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const ChannelItem = memo(({ item, onPress }: any) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={onPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {item?.logo ? (
          <ImageBackground
            source={{ uri: item?.logo }}
            resizeMode="stretch"
            style={[styles.card,{ borderWidth:isFocused ? 3 : 1, borderColor: isFocused ? AppColors.pink: 'rgba(255,255,255,0.3)' }]}
          >
          </ImageBackground>
        ) : (
            <LinearGradient
              colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.06)']}
              style={[styles.card, { borderWidth: isFocused ? 3 : 1, borderColor: isFocused ? AppColors.pink : 'rgba(255,255,255,0.3)' }]}
            />
        )}
        <CustomText
          text={item?.name ?? ''}
          size={10}
          textAlign="center"
          textTransform="uppercase"
          customStyle={{ width: Platform.isTV ? ScreenUtils.wp(10.5) : ScreenUtils.wp(14.6), marginVertical: 4 }}
        />
      </TouchableOpacity>
    );
  });

  return (
    <FocusContext.Provider value={sectionListFocusKey}>
      <Wrapper colors={[AppColors.blue, AppColors.purple, AppColors.pink]}>
        {showExitModal && (
          <Modal
            visible={showExitModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowExitModal(!showExitModal)}
          >
            <View style={styles.modalOverlay}>
              <ImageBackground source={AppAssets.catbg} resizeMode="cover" style={styles.modalContent}>
                <CustomText text="Exit App?" size={20} font={AppFonts.bold} />
                <CustomText
                  text="Are you sure you want to exit?"
                  size={16}
                  customStyle={{ marginTop: 2 }}
                />
                <View style={styles.modalButtonsContainer}>
                  <AppButton
                    text="Exit"
                    onPress={() => RNExitApp.exitApp()}
                    width={ScreenUtils.wp(15)}
                    textColor={AppColors.white}
                    buttonStyle={styles.logoutButton}
                  />
                  <AppButton
                    text="Cancel"
                    onPress={() => setShowExitModal(!showExitModal)}
                    width={ScreenUtils.wp(15)}
                  />
                </View>
              </ImageBackground>
            </View>
          </Modal>
        )}
        <KeepAwake />
        <View style={styles.container}>
          <View style={[styles.channelsContainer, { width: ScreenUtils.wp(100) }]}>
            <View style={styles.header}>
              <MenuIcon
                ref={filterRef}
                onPress={() => setShowCategory(true)}
              >
                <Filter width={30} height={30} />
              </MenuIcon>

              <View style={{ width: ScreenUtils.WinWidth, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Logo width={120} height={70} />
              </View>
              <SearchInput search={search} setSearch={setSearch} />
            </View>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={AppColors.white} size="large" />
              </View>
            ) : sectionedData?.length > 0 ? (
              <SectionList
                ref={sectionListRef}
                sections={sectionedData}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item, index) => `row-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.rowContainer}>
                    {item.map((channel: { name: React.Key | null | undefined; uri: any; }) => (
                      <ChannelItem
                        key={channel.name}
                        item={channel}
                        onPress={() =>
                          nav.navigate(AppRoutes.StreamDetailsScreen, {
                            url: channel?.uri ?? '',
                            name: channel?.name ?? '',
                            channals: liveVideos ?? [],
                            sectionData: groupChannelsByCategory(categorizedChannels) ?? [],
                          })
                        }
                      />
                    ))}
                  </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.sectionHeader}>
                    <CustomText
                      text={title}
                      size={16}
                      textTransform="capitalize"
                      font={AppFonts.regular}
                      customStyle={{ color: AppColors.gray }}
                    />
                    <View style={styles.sectionDivider} />
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <CustomText text="No Channels Found" textAlign="center" size={20} />
              </View>
            )}
          </View>
          {showCategory && (
            <View style={styles.categoriesContainer}>
              <CategoryScrollView
                loading={isLoading}
                setByCategory={setByCategory}
                categoriesData={categoriesData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onClose={() => setShowCategory(false)}
              />
            </View>
          )}
          {isPipActive && !Platform.isTV && selectedChannel && (
            <View
              ref={pipRef}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 30,
                width: ScreenUtils.wp(26),
                height: ScreenUtils.hp(31),
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                borderRadius: 12,
                borderWidth: pipFocused ? 2 : 0,
                borderColor: AppColors.white,
                overflow: 'hidden',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ borderRadius: 12, overflow: 'hidden' }}
                onPress={() =>
                  nav.navigate(AppRoutes.StreamDetailsScreen, {
                    url: selectedChannel ?? '',
                    name: '',
                    channals: liveVideos ?? [],
                    sectionData: groupChannelsByCategory(categorizedChannels) ?? [],
                  })
                }
              >
                <VLCPlayer
                  autoplay
                  paused={paused}
                  autoAspectRatio
                  source={{
                    initType: 2,
                    uri: selectedChannel,
                    initOptions: [
                      '--rtsp-tcp',
                      '--network-caching=150',
                      '--rtsp-caching=150',
                      '--no-stats',
                      '--tcp-caching=150',
                      '--realrtsp-caching=150',
                    ],
                  }}
                  onError={(error) => console.log('Video Error:', error)}
                  style={{ width: ScreenUtils.wp(26), height: ScreenUtils.hp(31), borderRadius: 12 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Wrapper>
    </FocusContext.Provider>
  );
};

const chunkArray = (arr: string | any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

export default memo(DashboardScreen);