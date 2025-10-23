import React, { memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../../../constants/AppColors';
import { AppAssets } from '../../../constants/AppAssets';
import { CustomText } from '../../../components/AppText/CustomText';
import { styles } from './styles';
import { ScreenUtils } from '../../../utils/ScreenUtils';
import AppButton from '../../../components/AppButton/AppButton';
import { useDispatch } from 'react-redux';
import { userDataReset } from '../../../redux/slices/userDataSlice';
import Helper from '../../../utils/Helper';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../constants/AppRoutes';
import { AppFonts } from '../../../constants/AppFonts';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import MenuIcon from './menuIcon';
import LogoutButton from './LogoutButton';
import DrawerCategoryItem from './DrawerCategoryItem';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'TOGGLE_FILTER_TYPE':
      return { ...state, filterType: state.filterType === 'alphabet' ? 'category' : 'alphabet' };
    case 'CLEAR_FILTER_TYPE':
      return { ...state, filterType: 'category' };
    case 'TOGGLE_LOGOUT_MODAL':
      return { ...state, showLogoutModal: !state.showLogoutModal };
    default:
      return state;
  }
};

const CategoryScrollView = React.memo(({ selectedCategory, setSelectedCategory, onClose, loading, categoriesData, setByCategory }: any) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const alphabets = useMemo(() => '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), []);
  const [{ filterType, showLogoutModal }, localDispatch] = useReducer(reducer, {
    filterType: 'category',
    showLogoutModal: false,
  });
  const [clearFocused, setClearFocused] = useState(false);
  const { ref: listRef, focusSelf, focusKey: listKey } = useFocusable();
  const { ref: crossRef } = useFocusable();
  const { ref: clearRef } = useFocusable();
  const { ref: logoutRef } = useFocusable();

  const handleLogout = useCallback(() => {
    dispatch(userDataReset());
    Helper.resetAndGo(nav, AppRoutes.loginScreen);
  }, [dispatch, nav]);

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const categoriesWithCounts = useMemo(
    () => {
      if (!categoriesData) return [];
      return Object.entries(categoriesData).map(([name, count]) => `${name} (${count})`);
    },
    [categoriesData]
  );

  const handleClearFilter = useCallback(() => {
    setSelectedCategory('All');
    localDispatch({ type: 'CLEAR_FILTER_TYPE' });
    setByCategory(true);
  }, [setSelectedCategory, setByCategory]);

  const toggleFilterType = useCallback((type: string) => {
    localDispatch({ type: 'TOGGLE_FILTER_TYPE' });
    setByCategory(type === 'category');
  }, [setByCategory]);

  return (
      <ImageBackground style={{ flex: 1, height: ScreenUtils.fullHeight }} source={AppAssets.catbg} resizeMode="cover">
        <View style={styles.headerContainer}>
          <MenuIcon ref={crossRef} customStyle={{ marginLeft: ScreenUtils.wp(3) }} onPress={onClose}>
            <Image source={AppAssets.closeLarge} tintColor={AppColors.white} style={styles.closeIcon} />
          </MenuIcon>
          <TouchableOpacity
            ref={clearRef}
            onPress={handleClearFilter}
            onFocus={() => setClearFocused(true)}
            onBlur={() => setClearFocused(false)}
            activeOpacity={0.8}
            style={{ marginTop: 10, marginRight: 20 }}
          >
            <CustomText text="Clear Filter" customStyle={{ color: clearFocused ? AppColors.white : AppColors.gray }} />
          </TouchableOpacity>
        </View>
        <CustomText text="Filter Channels by" customStyle={styles.headerText} />
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          <View style={styles.buttonContainer}>
            <AppButton
              text="Category"
              onPress={() => toggleFilterType('category')}
              width={ScreenUtils.wp(16)}
              textColor={filterType === 'category' ? AppColors.white : AppColors.black}
              buttonStyle={{ backgroundColor: filterType === 'category' ? AppColors.orange : AppColors.white }}
            />
            <AppButton
              text="Alphabet"
              onPress={() => toggleFilterType('alphabet')}
              width={ScreenUtils.wp(16)}
              textColor={filterType === 'alphabet' ? AppColors.white : AppColors.black}
              buttonStyle={{ backgroundColor: filterType === 'alphabet' ? AppColors.orange : AppColors.white }}
            />
          </View>
          <View style={styles.separator} />
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={AppColors.white} size="large" />
            </View>
          ) : (
            <FlatList
              ref={listRef}
              key={filterType}
              numColumns={filterType === 'alphabet' ? 6 :2}
              style={{marginLeft:ScreenUtils.wp(4)}}
              data={filterType === 'alphabet' ? alphabets : categoriesWithCounts}
              keyExtractor={(item: any) => item.toString()} // Ensure keys are unique
              renderItem={({ item }: any) => (
                <DrawerCategoryItem
                  item={item}
                  onPress={() => setSelectedCategory(item)}
                  selectedCategory={selectedCategory}
                  filterType={filterType}
                />
              )}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            />
          )}
          <LogoutButton ref={logoutRef} onPress={() => localDispatch({ type: 'TOGGLE_LOGOUT_MODAL' })} />
        </ScrollView>
        {showLogoutModal && (
          <Modal
            visible={showLogoutModal}
            transparent
            animationType="slide"
            onRequestClose={() => localDispatch({ type: 'TOGGLE_LOGOUT_MODAL' })}
          >
            <View style={styles.modalOverlay}>
              <ImageBackground source={AppAssets.catbg} resizeMode="cover" style={styles.modalContent}>
                <CustomText text="Logout?" size={20} font={AppFonts.bold} />
                <CustomText
                  text="Are you sure you want to logout?"
                  size={16}
                  customStyle={{ marginTop: 2 }}
                />
                <View style={styles.modalButtonsContainer}>
                  <AppButton
                    text="Logout"
                    onPress={handleLogout}
                    width={ScreenUtils.wp(15)}
                    textColor={AppColors.white}
                    buttonStyle={styles.logoutButton}
                  />
                  <AppButton
                    text="Cancel"
                    onPress={() => localDispatch({ type: 'TOGGLE_LOGOUT_MODAL' })}
                    width={ScreenUtils.wp(15)}
                  />
                </View>
              </ImageBackground>
            </View>
          </Modal>
        )}
      </ImageBackground>
  );
});

export default memo(CategoryScrollView);