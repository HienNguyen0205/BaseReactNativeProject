import { widthPercentageToDP as wp } from "@/utils/responsive"
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import TextWrapper from "../text/TextWrapper";
import { ReactNode } from "react";
import resources from "@/constants/resources";
import FastImage from "@d11/react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

export type headerProps = {
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: String;
  headerRight?: () => ReactNode;
  canGoBack?: boolean;
  handleBack?: () => void;
};

const Header = (props: headerProps) => {
    const {
      headerStyle,
      titleStyle,
      title,
      headerRight,
      canGoBack = true,
      handleBack
    } = props;

    const navigation = useNavigation();

    const handleBackAction = () => {
        if(handleBack){
            handleBack()
        }else{
            navigation.goBack()
        }
    }

    const renderLeftHeader = () => {
      if (canGoBack) {
        return (
          <TouchableOpacity onPress={handleBackAction}>
            <FastImage
              style={styles.headerIcon}
              source={resources.icon.angleLeft}
            />
          </TouchableOpacity>
        );
      }
      return null;
    };

    return (
      <View style={[styles.container, headerStyle]}>
        {renderLeftHeader()}
        <TextWrapper style={[styles.titleStyle, titleStyle]}>
          {title}
        </TextWrapper>
        {headerRight && headerRight()}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    paddingHorizontal: 12,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  titleStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    paddingHorizontal: wp(24),
    fontSize: 20
  },
  headerIcon: {
    width: 18,
    height: 18,
    padding: 8,
  },
});

export default Header