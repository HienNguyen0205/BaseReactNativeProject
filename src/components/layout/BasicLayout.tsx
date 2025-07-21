import FastImage, { Source } from '@d11/react-native-fast-image'
import React, { ReactNode, useEffect } from 'react'
import { BackHandler, StyleProp, StyleSheet, TextProps, View, ViewStyle } from 'react-native'
import LoadingOverlay from './LoadingOverlay'
import { widthPercentageToDP as wp } from '@/utils/responsive'
import Header from './Header'

export type basicLayoutProps = {
  background?: number | Source;
  isLoading?: boolean;
  title: string;
  canGoBack?: boolean;
  children: ReactNode;
  renderBottom?: ReactNode;
  bottomContainerStyle?: StyleProp<ViewStyle>;
  headerRight?: () => ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextProps>;
  handleBack?: () => void;
};

const BasictLayout = (props: basicLayoutProps) => {
    const {
      background,
      isLoading = false,
      title,
      canGoBack = true,
      children,
      renderBottom,
      headerRight,
      headerStyle,
      titleStyle,
      handleBack,
    } = props;

    console.log("isLoading", isLoading)

    useEffect(() => {
      if (!canGoBack){
        const subcripsion = BackHandler.addEventListener(
          'hardwareBackPress',
          () => true,
        );
        return () => subcripsion.remove();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <FastImage
        style={styles.container}
        source={background}
        resizeMode="stretch"
      >
        <LoadingOverlay visible={isLoading} />
        <Header
          headerStyle={headerStyle}
          title={title}
          titleStyle={titleStyle}
          headerRight={headerRight}
          canGoBack={canGoBack}
          handleBack={handleBack}
        />
        <View style={styles.contentContainer}>{children}</View>
        {renderBottom && (
          <View style={[styles.bottomContainer]}>{renderBottom}</View>
        )}
      </FastImage>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative'
    },
    contentContainer: {
      flex: 1,
    },
    bottomContainer: {
      width: wp(100),
      paddingHorizontal: 12,
      paddingVertical: 24
    },
})

export default BasictLayout