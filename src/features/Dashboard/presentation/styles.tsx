import { Platform, StyleSheet } from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { ScreenUtils } from "../../../utils/ScreenUtils";

export const styles = StyleSheet.create({
  categoriesContainer: {
    position: "absolute",
    left: 0,
    height: ScreenUtils.WinHeight,
    width: ScreenUtils.wp(43),
    backgroundColor: AppColors.dimBlack,
  },
  cardContainer: {
    padding: 15,
    width: ScreenUtils.wp(14),
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: ScreenUtils.wp(1),
    width: Platform.isTV ? ScreenUtils.wp(10.7) : ScreenUtils.wp(14.3),
    height: Platform.isTV ? ScreenUtils.hp(15) : ScreenUtils.hp(19),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.3)'
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  // itemContainer: {
  //   borderRadius: 10,
  //   margin: ScreenUtils.wp(0.9),
  //   overflow: 'hidden',
  // },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingBottom: Platform.isTV ? 50 : 0,
  },
  sectionDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginLeft: 6,
  },
  selectedCategoryItem: {
    backgroundColor: "#ddd",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategoryText: {
    fontWeight: "bold",
    color: "#000",
  },
  channelsContainer: {
    padding: 10,
  },
  channelItem: {
    padding: 15,
    width: ScreenUtils.wp(14),
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    flex: 1, flexDirection: 'row',
    justifyContent:"center",
    paddingTop: Platform.isTV ? 20 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  searchInput: {
    width: ScreenUtils.wp(30),
    height: 45,
    alignSelf: "flex-end",
    marginVertical: 0
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: "center",
    paddingVertical: 10,
    // paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Adjust based on UI preference
  },
  searchContainer: {
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  itemContainer: {
    margin: ScreenUtils.wp(0.5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent', // Default invisible border
  },
  modalOverlay: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: ScreenUtils.wp(60),
    height: Platform.isTV ? ScreenUtils.hp(30) :ScreenUtils.hp(45),
    padding: 20,
    backgroundColor: AppColors.dimBlack,
    borderRadius: 15,
    overflow: "hidden"
  },
  modalButtonsContainer: {
    width: ScreenUtils.wp(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: "flex-end",
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: AppColors.gray,
  },
  logoutButton: {
    backgroundColor: AppColors.red,
  },
})