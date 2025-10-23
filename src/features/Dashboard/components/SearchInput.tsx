import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AppInput from '../../../components/AppInput/AppInput'
import { AppAssets } from '../../../constants/AppAssets'
import { AppColors } from '../../../constants/AppColors'
import { ScreenUtils } from '../../../utils/ScreenUtils'
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'

interface Props {
    search: string,
    setSearch: (value: string) => void,
}
const SearchInput = ({search,setSearch}:Props) => {
    const [isFocused,setIsFocused] = React.useState<boolean>(false);
    const { ref: searchRef } = useFocusable();
  return (
    <TouchableOpacity activeOpacity={1} focusable onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} onPress={()=>{searchRef.current.focus()}}>
                  <LinearGradient colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.06)']} style={styles.searchContainer}>
                   <AppInput
                    value={search}
                    inputRef={searchRef}
                    icon={AppAssets.search}
                    isFocused={isFocused}
                    placeholder="Search"
                    onChangeText={setSearch}
                    placeholderColor={AppColors.gray}
                    containerStyle={styles.searchInput}
                    customStyle={{ paddingLeft: 50, width: ScreenUtils.wp(28) }}
                  />
                  </LinearGradient>
                  </TouchableOpacity>
  )
}

export default SearchInput

const styles = StyleSheet.create({
    searchContainer: {
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
      },
      searchInput: {
        width: ScreenUtils.wp(30),
        height: 45,
        alignSelf: "flex-end",
        marginVertical: 0
      },
})