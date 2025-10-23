import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle
} from 'react-native';
import { AppColors } from '../../constants/AppColors';
import { styles } from './styles';

interface AppInputProps {
  inputRef?: React.LegacyRef<TextInput>;
  autoFocus?: boolean;
  maxLength?: number;
  value: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  customStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  editable?: boolean;
  secureTextEntry?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  blurOnSubmit?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  numberOfLines?: number;
  multiline?: boolean;
  onLayout?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: boolean;
  isPassword?: boolean;
  hidePass?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  errorIcon?: boolean;
  icon?: any;
  focusable?: boolean;
  placeholderColor?: string;
  hasTVPreferredFocus?: boolean
  eyeRef?: any,
  isFocused? : boolean
}

const AppInput: React.FC<AppInputProps> = ({
  inputRef,
  autoFocus,
  maxLength,
  value,
  autoCapitalize = 'none',
  keyboardType = 'default',
  icon,
  placeholder,
  customStyle,
  onChangeText,
  onSubmitEditing,
  editable = true,
  returnKeyType,
  blurOnSubmit,
  secureTextEntry = false,
  numberOfLines,
  multiline,
  eyeRef,
  isPassword = false,
  hidePass,
  containerStyle,
  placeholderColor = AppColors.white,
  focusable = true,
  hasTVPreferredFocus = true,
  isFocused = false
}) => {
  // const [isEyeFocused, setIsEyeFocused] = useState<boolean>(false);

  return (
    // <View style={{ flexDirection: 'row', alignItems: "center" }}>
    //   <View
    //     style={[
    //       styles.container,
    //       { borderColor: isFocused ? AppColors.white : AppColors.gray },
    //       containerStyle,
    //       { borderWidth: isFocused ? 3 : 1 }
    //     ]}
    //   >
    //     {icon && <Image source={icon} resizeMode='contain' style={{
    //       width: 25,
    //       height: 25,
    //       position: 'absolute',
    //       left: 10,
    //     }} />}
        <TextInput
          ref={inputRef}
          hasTVPreferredFocus={hasTVPreferredFocus}
          focusable={focusable}
          editable={editable}
          maxLength={maxLength}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[
            styles.container,
            { borderColor: isFocused ? AppColors.white : AppColors.gray },
            { borderWidth: isFocused ? 3 : 1 },
            containerStyle,
          ]}
        />
    //   </View>
    //   {isPassword && (
    //     <TouchableOpacity
    //       ref={eyeRef}
    //       hitSlop={10}
    //       onFocus={() => setIsEyeFocused(true)}
    //       onBlur={() => setIsEyeFocused(false)}
    //       activeOpacity={1}
    //       style={{
    //         width: 45,
    //         height: 45,
    //         alignItems: "center",
    //         justifyContent: "center",
    //         borderWidth: isEyeFocused ? 3 : 1,
    //         borderColor: isEyeFocused ? AppColors.white : AppColors.gray,
    //         borderRadius: 10,
    //       }}
    //       onPress={hidePass}
    //     >
    //       <Image
    //         source={
    //           secureTextEntry ? AppAssets.eyeClose : AppAssets.eyeOpen
    //         }
    //         tintColor={AppColors.white}
    //         style={{ width: 20, height: 20 }}
    //       />
    //     </TouchableOpacity>
    //   )}
    // </View>
  );
};

export default AppInput;
