import React, {
  useState,
  useRef,
  useEffect,
  Ref,
  useImperativeHandle,
  JSX,
  useId,
} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Pressable,
  TextStyle,
  TextInputFocusEvent,
  TextInputEndEditingEvent,
  TextInputSubmitEditingEvent,
  ReturnKeyTypeOptions,
  ColorValue,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@/utils/responsive';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
} from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import resources from '@/constants/resources';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';

type dynamicLabelInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  renderLeftIcon?: () => JSX.Element;
  label?: string;
  value: string;
  uniqueIdForBasicInput?: string;
  isFocus?: boolean;
  onChange?: (text: string) => void;
  onSubmitEditing?: (e: TextInputSubmitEditingEvent) => void;
  onBlur?: (e: TextInputFocusEvent) => void;
  onFocus?: (e: TextInputFocusEvent) => void;
  showClearButton?: boolean;
  placeholder?: string;
  removeSpecialCharacter?: boolean;
  removeSignedCharacter?: boolean;
  disableContextMenu?: boolean;
  readOnly?: boolean;
  renderRightIcon?: () => JSX.Element;
  onPressRightIcon?: () => void;
  onInputPress?: () => void;
  labelStyle?: StyleProp<TextStyle>;
  onEndEditing?: (e: TextInputEndEditingEvent) => void;
  ref?: Ref<inputRefDef>;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  contextMenuHidden?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  placeholderTextColor?: ColorValue;
};

type labellPositionDef = {
  topBlur: number;
  lineHeightFocus: number;
  lineHeightBlur: number;
};

type inputRefDef = {
  focus: () => void;
  blur: () => void;
};

const labelAniConfig = {
  duration: 100,
  easing: Easing.linear,
};

const BasicInputBottomSheet = (props: dynamicLabelInputProps) => {
  const {
    containerStyle,
    renderLeftIcon,
    label,
    value,
    isFocus,
    onChange,
    onSubmitEditing,
    onBlur,
    onFocus,
    showClearButton,
    placeholder,
    readOnly = false,
    renderRightIcon,
    onPressRightIcon,
    onInputPress,
    labelStyle,
    onEndEditing,
    ref,
    returnKeyType = 'done',
    maxLength,
    contextMenuHidden = false,
    autoCapitalize = 'none',
    secureTextEntry = false,
    placeholderTextColor = '#BFBFBF',
  } = props;

  const [focus, setFocus] = useState(isFocus ?? false);
  const calculatedValues = useSharedValue<labellPositionDef>({
    topBlur: hp(5.1) / 2 - hp(2.7) / 2,
    lineHeightFocus: hp(2.1),
    lineHeightBlur: hp(2.7),
  });

  const uniqueID = useId();

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [focus]);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }),
    [],
  );

  const inputRef = useRef<TextInput>(null);

  const labelAni = useAnimatedStyle(() => {
    return {
      top: withTiming(
        focus || value || (label && placeholder)
          ? 0
          : calculatedValues!.value.topBlur,
        labelAniConfig,
      ),
      height: withTiming(
        focus || value || (label && placeholder)
          ? calculatedValues!.value.lineHeightFocus
          : calculatedValues!.value.lineHeightBlur,
        labelAniConfig,
      ),
      lineHeight: withTiming(
        focus || value || (label && placeholder)
          ? calculatedValues!.value.lineHeightFocus
          : calculatedValues!.value.lineHeightBlur,
        labelAniConfig,
      ),
      fontSize: withTiming(
        focus || value || (label && placeholder) ? 12 : 14,
        labelAniConfig,
      ),
      color: focus || value || (label && placeholder) ? '#595959' : '#BFBFBF',
    };
  }, [focus, calculatedValues, value]);

  const handleBlur = (e: TextInputFocusEvent) => {
    setFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = (e: TextInputFocusEvent) => {
    setFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleChangeText = (text: string) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <TouchableOpacity
      testID={uniqueID}
      accessibilityLabel={uniqueID}
      style={[styles.inputContainer, containerStyle]}
      disabled={!onInputPress}
      onPress={onInputPress}
    >
      {renderLeftIcon && (
        <View style={styles.iconContainer}>{renderLeftIcon()}</View>
      )}
      <Pressable
        style={styles.innerInputContainer}
        onPress={() => setFocus(true)}
        disabled={(!label || readOnly) && !!onInputPress}
      >
        <BottomSheetTextInput
          ref={inputRef}
          value={value}
          style={{
            ...styles.inputStyle,
            height: label ? '54%' : '100%',
            display:
              focus || !!value || !label || placeholder ? 'flex' : 'none',
          }}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          readOnly={readOnly}
          onEndEditing={onEndEditing}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          contextMenuHidden={contextMenuHidden}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
        {label && (
          <Animated.Text style={[styles.label, labelAni, labelStyle]}>
            {label}
          </Animated.Text>
        )}
      </Pressable>
      {showClearButton && value && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleChangeText('')}
          disabled={!value}
        >
          <FastImage source={resources.icon.crossCircle} style={styles.icon} />
        </TouchableOpacity>
      )}
      {renderRightIcon && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={onPressRightIcon}
        >
          {renderRightIcon()}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: hp(6.9),
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: wp(4.3),
    paddingVertical: hp(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: '#DDE4EE',
  },
  iconContainer: {
    height: wp(6),
    width: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(4.3),
  },
  innerInputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  inputStyle: {
    width: '100%',
    color: '#212B36',
    padding: 0,
    fontSize: 13,
  },
  label: {
    color: '#9DA4AE',
    position: 'absolute',
    left: 0,
  },
  icon: {
    width: wp(4.3),
    height: wp(4.3),
  },
});

export default BasicInputBottomSheet;
