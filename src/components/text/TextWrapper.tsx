import { useId } from 'react';
import { ColorValue, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type textProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  dataDetectorType?: 'link' | 'phoneNumber' | 'email' | 'none' | 'all';
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
  selectable?: boolean;
  selectionColor?: ColorValue;
};

const TextWrapper = (props: textProps) => {
  const {
    children,
    style,
    onPress,
    dataDetectorType,
    ellipsizeMode,
    numberOfLines,
    selectable,
    selectionColor,
  } = props;

  const uniqueID = useId()

  return (
    <Text
      testID={uniqueID}
      accessibilityLabel={uniqueID}
      style={[styles.textStyle, style]}
      onPress={onPress}
      dataDetectorType={dataDetectorType}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      selectable={selectable}
      selectionColor={selectionColor}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
    textStyle: {
        color: '#000',
        fontSize: 12,
    }
})

export default TextWrapper;
