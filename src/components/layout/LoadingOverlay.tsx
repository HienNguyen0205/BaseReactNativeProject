import React from "react"
import { ActivityIndicator, ColorValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native"

export type loadingOverlayProps = {
    visible: boolean;
    color?: ColorValue;
    backdropStyle?: StyleProp<ViewStyle>;
}

const LoadingOverlay = (props: loadingOverlayProps) => {
    const { visible, color, backdropStyle = { backgroundColor: '#000000' } } = props;

    return (
      <View pointerEvents={visible ? "auto" : "box-none"} style={[StyleSheet.absoluteFill, styles.container, visible ? backdropStyle : {}]}>
        <ActivityIndicator animating={visible} color={color} size="large"/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
    opacity: 0.5
  },
});

export default LoadingOverlay