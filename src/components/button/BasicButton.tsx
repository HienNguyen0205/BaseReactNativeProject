import React, { ReactNode, useId } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TextWrapper } from '@/components';
import { widthPercentageToDP as wp } from '@/utils/responsive';

type buttonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
  renderLeftIcon?: () => ReactNode;
  disable?: boolean;
  textStyle?: StyleProp<TextStyle>
};

const BasicButton = (props: buttonProps) => {

    const {
      onPress,
      style,
      children,
      iconStyle,
      renderLeftIcon,
      disable,
      textStyle,
    } = props;

    const uniqueID = useId()

    return (
      <TouchableOpacity
        testID={uniqueID}
        accessibilityLabel={uniqueID}
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disable}
      >
        {renderLeftIcon && (
          <View style={[styles.iconWrapper, iconStyle]}>
            {renderLeftIcon()}
          </View>
        )}
        <TextWrapper style={[styles.text,textStyle]}>{children}</TextWrapper>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },
  iconWrapper: {
    width: wp(4.3),
    height: wp(4.3),
  },
  text: {
    fontSize: 16
  }
});

export default BasicButton;