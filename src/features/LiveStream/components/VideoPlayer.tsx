import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  TouchableWithoutFeedback,
  useTVEventHandler,
  View
} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { CustomText } from '../../../components/AppText/CustomText';
import { AppAssets } from '../../../constants/AppAssets';
import { AppColors } from '../../../constants/AppColors';
import { ScreenUtils } from '../../../utils/ScreenUtils';
import ButtonControll from './buttonControll';
import { styles } from './styles';

interface Props {
  uri: string;
  onNext: CallableFunction;
  onPrevious: CallableFunction;
  handlePipPress: CallableFunction;
  handleListPress: CallableFunction;
  onBackPres: CallableFunction;
  chanName: string;
  isPip: boolean;
  ref?: any;
  showlist?: boolean
  focusChange?: boolean;
}

const VideoPlayer = ({
  uri,
  onNext,
  onPrevious,
  isPip,
  handlePipPress,
  handleListPress,
  onBackPres,
  chanName,
  showlist,
  focusChange,
}: Props) => {
  const [buffering, setBuffering] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showResol, setShowResol] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [aspectRatioMode, setAspectRatioMode] = useState<'Zoom' | 'Stretch' | 'Orignal'>('Stretch');
  const [focusedInput, setFocusedInput] = useState<'back' | 'prev' | 'next' | 'ratio' | 'mute' | 'list' | 'play' | 'categories'>('play');
  const vlcRef = useRef<VLCPlayer>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);
  const bufferingTimer = useRef<NodeJS.Timeout | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<any>(null);

  const hideResolText = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowResol(true);
    timerRef.current = setTimeout(() => {
      setShowResol(false);
      timerRef.current = null;
    }, 1500);
  };

  useEffect(() => {
    startHideControlsTimer()
  }, [focusChange])

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300, // 300ms ease-in
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300, // 300ms ease-out
      useNativeDriver: true,
    }).start();
  };

  const handleBuffering = (event: any) => {
    if (buffering) {
      return;
    }

    if (event) {
      setBuffering(true);

      if (bufferingTimer.current) {
        clearTimeout(bufferingTimer.current);
      }

      bufferingTimer.current = setTimeout(() => {
        setBuffering(false);
      }, 1000); // 1 second
    } else {
      setBuffering(false);

      if (bufferingTimer.current) {
        clearTimeout(bufferingTimer.current);
      }
    }
  };

  const startHideControlsTimer = () => {
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current); // Clear previous timer
    }
    hideControlsTimer.current = setTimeout(() => {
      fadeOut();
      setFocusedInput('play')
      setTimeout(() => { setShowControls(false) }, 300);
    }, Platform.isTV ? 10000 : 5000);
  };

  const handleScreenTouch = () => {
    handleListPress(false);
    if (showControls) {
      fadeOut();
      setFocusedInput('play')
      setTimeout(() => setShowControls(false), 300);
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    } else {
      setShowControls(true);
      setFocusedInput('play')
      fadeIn();
      startHideControlsTimer();
    }
  };

  useEffect(() => {
    if (showControls) {
      fadeIn();
      startHideControlsTimer();
    }
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    };
  }, [showControls]);

  const lastPlayPausePress = useRef<number>(0);
  const togglePlayPause = () => {
    const now = Date.now();
    if (now - lastPlayPausePress.current < 300) return;
    lastPlayPausePress.current = now;
    setPaused(!paused);
    startHideControlsTimer();
  };

  const toggleAspectRatio = () => {
    const modes = ['Zoom', 'Stretch', 'Orignal'];
    const currentIndex = modes.indexOf(aspectRatioMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setAspectRatioMode(modes[nextIndex] as 'Zoom' | 'Stretch' | 'Orignal');
    hideResolText();
    startHideControlsTimer();
  };

  const getAspectRatioStyle = () => {
    switch (aspectRatioMode) {
      case 'Zoom':
        return { width: ScreenUtils.fullWidth, height: ScreenUtils.fullWidth * (9 / 16) };
      case 'Stretch':
        return { width: ScreenUtils.fullWidth, height: ScreenUtils.fullHeight };
      case 'Orignal':
      default:
        return styles.video;
    }
  };
  const getAspectRatioIcon = () => {
    switch (aspectRatioMode) {
      case 'Zoom':
        return AppAssets.full;
      case 'Stretch':
        return AppAssets.stretch;
      case 'Orignal':
      default:
        return AppAssets.orignal;
    }
  };

  const handleTVRemote = (evt: any) => {
    if (!evt) return;
    switch (evt.eventType) {
      case 'down':
        if (showlist) {
          setFocusedInput('categories');
        } else {
          if (focusedInput === 'back') setFocusedInput('prev');
          else if (focusedInput === 'list') setFocusedInput('next');
          else if (focusedInput === 'mute') setFocusedInput('list');
          else if (focusedInput === 'ratio') setFocusedInput('mute');
        }
        break;

      case 'up':
        if (!showlist) {
          if (focusedInput === 'play') setFocusedInput('list');
          else if (focusedInput === 'list') setFocusedInput('mute');
          else if (focusedInput === 'mute') setFocusedInput('ratio');
          else if (focusedInput === 'ratio') setFocusedInput('back');
          else if (focusedInput === 'prev') setFocusedInput('list');
          else if (focusedInput === 'next') setFocusedInput('list');
        }
        break;

      case 'select':
        if (focusedInput === 'play') return;
        else if (focusedInput === 'prev') onPrevious();
        else if (focusedInput === 'back') onBackPres();
        else if (focusedInput === 'list') {
          handleListPress(!showlist);
          if (!showlist) {
            setFocusedInput('categories');
          } else {
            setFocusedInput('play');
          }
          startHideControlsTimer();
        }
        else if (focusedInput === 'mute') setIsMuted(!isMuted), startHideControlsTimer();
        else if (focusedInput === 'ratio') toggleAspectRatio(), startHideControlsTimer();
        else if (focusedInput === 'next') onNext();
        break;

      case 'playPause':
        if (showlist) {
          return;
        } else {
          togglePlayPause();
        }
        break;

      case 'left':
        if (showlist) {
          return;
        } else {
          onPrevious();
        }
        break;

      case 'right':
        if (showlist) {
          return;
        } else {
          onNext();
        }
        break;
    }
  };

  useTVEventHandler(handleTVRemote);

  React.useEffect(() => {
    setTimeout(() => {
      setFocusedInput('play')
    }, 500);
  }, []);

  // useEffect(() => {
  //   const appStateListener = AppState.addEventListener('change', (nextAppState) => {
  //     const isActive = nextAppState === 'active';

  //     if (!isActive && !isPip) {
  //       // Pause the player if the app is in the background and not in PiP mode
  //       setPaused(true);
  //     } else {
  //       setPaused(false);
  //     }
  //   });

  //   return () => appStateListener.remove();
  // }, [isPip, paused]);

  return (
    <TouchableWithoutFeedback onPress={handleScreenTouch}>
      <View
        style={{
          width: isPip ? ScreenUtils.WinWidth : ScreenUtils.fullWidth,
          height: isPip ? ScreenUtils.WinHeight : ScreenUtils.fullHeight,
          alignItems: isPip ? 'flex-start' : 'center',
          justifyContent: isPip ? 'flex-start' : 'center',
        }}>
        <View
          style={[
            isPip
              ? {
                width: ScreenUtils.WinWidth,
                height: ScreenUtils.WinHeight,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }
              : styles.container,
          ]}>
          <VLCPlayer
            autoplay
            paused={paused}
            muted={isMuted}
            ref={vlcRef}
            autoAspectRatio={true}
            source={{
              initType: 2,
              uri: uri,
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
            style={[isPip ? { width: ScreenUtils.wp(26), height: ScreenUtils.hp(31) } : getAspectRatioStyle()]}
          />
          {!isPip && showControls && <Animated.View style={[styles.controlsOverlay, styles.fullscreenContainer, { backgroundColor: AppColors.dimBlack }, { opacity: fadeAnim }]} />}
          {buffering && (
            <View style={styles.controlsOverlay}>
              <ActivityIndicator
                size={isPip ? 20 : 85}
                color={AppColors.white}
              />
            </View>
          )}

        </View>
        {!isPip && showControls && (
          <Animated.View
            style={{
              position: 'absolute',
              right: ScreenUtils.wp(5),
              top: 20,
              opacity: fadeAnim,
              zIndex: 1000,
            }}>
            <ButtonControll
              isFocused={focusedInput === 'ratio'}
              tooltipText="Aspect Ratio"
              onPress={toggleAspectRatio}
              icon={getAspectRatioIcon()}
            />
            <ButtonControll
              isFocused={focusedInput === 'mute'}
              tooltipText={isMuted ? 'Unmute' : 'Mute'}
              onPress={() => {
                if (!Platform.isTV) {
                  setIsMuted(!isMuted), startHideControlsTimer()
                }
              }}
              icon={isMuted ? AppAssets.mute : AppAssets.unmute}
            />
            {!Platform.isTV && <ButtonControll
              tooltipText="PiP Mode"
              onPress={() => handlePipPress()}
              icon={AppAssets.pip}
            />}
            <ButtonControll
              isFocused={focusedInput === 'list'}
              tooltipText="List"
              onPress={() => {
                if (!Platform.isTV) {
                  handleListPress(!showlist); startHideControlsTimer();
                }
              }}
              icon={AppAssets.menu}
            />
          </Animated.View>
        )}
        {!isPip && showControls && (
          <Animated.View
            style={[styles.toggleCategoryButton, { opacity: fadeAnim }]}>
            <ButtonControll
              isFocused={focusedInput === 'back'}
              onPress={() => {
                onBackPres();
              }}
              icon={AppAssets.back}
            />
            <CustomText text={`•  ${chanName ?? ''}`} />
          </Animated.View>
        )}
        {!isPip && showControls && (
          <Animated.View
            style={[styles.controlsOverlay, { opacity: fadeAnim, width: ScreenUtils.wp(60), }]}>
            <ButtonControll
              isFocused={focusedInput === 'prev'}
              tooltipText="Prev"
              onPress={() => { onPrevious(); startHideControlsTimer() }}
              icon={AppAssets.prev}
            />
            <ButtonControll
              isFocused={focusedInput === 'next'}
              tooltipText="Next"
              onPress={() => { onNext(); startHideControlsTimer(); }}
              icon={AppAssets.next}
            />
          </Animated.View>
        )}
        {!isPip && showControls && (
          <Animated.View
            style={[styles.controlsOverlay, { opacity: fadeAnim, width: ScreenUtils.wp(12), }]}>
            <ButtonControll
              autoFocus={true}
              isFocused={focusedInput === 'play'}
              onPress={togglePlayPause}
              width={60}
              height={60}
              tooltipText={paused ? 'Play' : 'Pause'}
              icon={paused ? AppAssets.play : AppAssets.pause}
            />
          </Animated.View>
        )}
        {!isPip && showResol && (
          <Animated.View
            style={[styles.resolutioncontainer, { opacity: fadeAnim }]}>
            <CustomText text={aspectRatioMode} />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayer;