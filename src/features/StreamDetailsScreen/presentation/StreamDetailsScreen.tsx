import { FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import KeepAwake from '@sayem314/react-native-keep-awake';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, AppState, BackHandler, FlatList, Image, Platform, TouchableOpacity, View } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import Logo from '../../../../assets/images/svg/logo2.svg';
import { CustomText } from '../../../components/AppText/CustomText';
import Wrapper from '../../../components/ScreenWrapper/ScreenWrapper';
import { AppAssets } from '../../../constants/AppAssets';
import { AppColors } from '../../../constants/AppColors';
import { AppFonts } from '../../../constants/AppFonts';
import { AppRoutes } from '../../../constants/AppRoutes';
import Helper from '../../../utils/Helper';
import MenuIcon from '../../Dashboard/components/menuIcon';
import { styles } from './styles';
import ChannelItem from '../components/ChannelItem';
import CategoryItem from '../components/CategoryItem';

const CHANNEL_ITEM_HEIGHT = 40;

const StreamDetailsScreen = () => {
    const nav = useNavigation();
    const { url, name, channals = [], sectionData = [] } = useRoute().params as any;
    const [currentTime, setCurrentTime] = useState('');
    const [buffering, setBuffering] = useState(false);
    const bufferingTimer = useRef<NodeJS.Timeout | null>(null);
    const [currentChan, setCurrentChan] = useState(url);
    const [selectedCategory, setSelectedCategory] = useState(sectionData[0]?.title || '');
    const [streamFocus, setStreamFocus] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);
    const CatListRef = useRef<FlatList>(null);
    const ChanListRef = useRef<FlatList>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const vlcRef = useRef<VLCPlayer>(null);

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

    const updateTime = () => {
        const now = new Date();
        setCurrentTime(
            now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) +
            ', ' +
            now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        );
    };
    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleBackPress = useCallback(() => {
        Helper.resetAndGoWithParams(nav, AppRoutes.dashboardScreen, { isPipActive: true, videoUri: currentChan ?? '' });
    }, [nav, currentChan]);

    useEffect(() => {
        const backAction = () => {
            handleBackPress();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [handleBackPress]);

    const handleBuffering = useCallback((event: any) => {
        if (event) {
            if (!buffering) {
                setBuffering(true);
                if (bufferingTimer.current) clearTimeout(bufferingTimer.current);
                bufferingTimer.current = setTimeout(() => setBuffering(false), 1000);
            }
        } else {
            setBuffering(false);
            if (bufferingTimer.current) clearTimeout(bufferingTimer.current);
        }
    }, [buffering]);

    const filteredChannals = useMemo(() => {
        const list = sectionData.find((section: any) =>
            section.title.toLowerCase() === selectedCategory.toLowerCase()
        )?.data || [];
        return list[0] || [];
    }, [sectionData, selectedCategory]);
    
    useEffect(() => {
        const foundCategory = sectionData.find((section: any) =>
            section.data.some((channel: any) =>
                channel.some((item: any) => item.uri === currentChan)
            ));
        if (foundCategory) {
            setSelectedCategory(foundCategory.title);
        }
    }, [currentChan, sectionData]);

    const selectedCategoryIndex = useMemo(() => {
        return sectionData.findIndex((section: any) => section.title === selectedCategory);
    }, [sectionData, selectedCategory]);

    const selectedChannelIndex = useMemo(() => {
        return filteredChannals.findIndex((channel: any) => channel.uri === currentChan);
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
        }, [selectedCategoryIndex, selectedChannelIndex])
    );

    useEffect(() => {
        return () => {
            setPaused(true);
        };
    }, []);

    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState !== 'active') {
                setPaused(true);
            } else {
                setPaused(false);
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <FocusContext.Provider value="streamFocus">
            <Wrapper>
                <KeepAwake />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <MenuIcon onPress={handleBackPress}>
                            <Image source={AppAssets.back} resizeMode="contain" style={{ width: 25, height: 25 }} />
                        </MenuIcon>
                        <View style={styles.logoView}>
                            <Logo width={120} height={70} />
                        </View>
                        <CustomText text={currentTime} />
                    </View>

                    <View style={styles.bodySection}>
                        <View style={styles.listSection}>
                            <View style={styles.categorySection}>
                                <CustomText text="Categories:" size={18} font={AppFonts.bold} />
                                <View style={styles.seperater} />
                                <FlatList
                                    ref={CatListRef}
                                    overScrollMode='never'
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingBottom: Platform.isTV ? 25 : 0
                                    }}
                                    data={sectionData}
                                    getItemLayout={(data, index) => ({
                                        length: CHANNEL_ITEM_HEIGHT,
                                        offset: CHANNEL_ITEM_HEIGHT * index,
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

                            <Animated.View style={[styles.categorySection, { opacity: fadeAnim }]}>
                                <CustomText text="Channels:" size={18} font={AppFonts.bold} />
                                <View style={styles.seperater} />
                                <FlatList
                                    ref={ChanListRef}
                                    overScrollMode='never'
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingBottom: Platform.isTV ? 25 : 0
                                    }}
                                    data={filteredChannals}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({ item }) => (
                                        <ChannelItem
                                            item={item}
                                            currentChan={currentChan}
                                            onPress={() => setCurrentChan(item.uri)}
                                        />
                                    )}
                                    getItemLayout={(data, index) => ({
                                        length: CHANNEL_ITEM_HEIGHT,
                                        offset: CHANNEL_ITEM_HEIGHT * index,
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

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onFocus={() => setStreamFocus(true)}
                            onBlur={() => setStreamFocus(false)}
                            onPress={() =>
                                Helper.resetAndGoWithParams(nav, AppRoutes.liveStream, {
                                    url: currentChan ?? '',
                                    name: name ?? '',
                                    channals: channals ?? [],
                                    sectionData: sectionData ?? [],
                                })
                            }
                            style={[styles.streamSection, streamFocus && { borderWidth: 2, borderColor: AppColors.white }]}
                        >
                            <VLCPlayer
                                autoplay
                                paused={paused}
                                ref={vlcRef}
                                autoAspectRatio={true}
                                source={{
                                    initType: 2,
                                    uri: currentChan ?? '',
                                    initOptions: [
                                        '--rtsp-tcp',
                                        '--network-caching=150',
                                        '--rtsp-caching=150',
                                        '--no-stats',
                                        '--tcp-caching=150',
                                        '--realrtsp-caching=150',
                                    ],
                                }}
                                onBuffering={handleBuffering}
                                onError={(error: any) => console.log('Video Error:', error)}
                                style={{ width: '100%', height: '100%', borderRadius: 12 }}
                            />
                            {buffering && (
                                <ActivityIndicator
                                    size="large"
                                    color={AppColors.white}
                                    style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Wrapper>
        </FocusContext.Provider>
    );
};

export default React.memo(StreamDetailsScreen);