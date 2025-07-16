import React, { useId } from 'react';
import {
  ColorValue,
  Modal,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
} from '@/utils/responsive';
import { BasicButton, TextWrapper } from '@/components';
import FastImage from '@d11/react-native-fast-image';
import resources from '@/constants/resources';

type modalProps = {
  animationType?: 'none' | 'slide' | 'fade';
  backdropColor?: ColorValue;
  visible: boolean;
  onClose: () => void;
  showTitle?: boolean;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  showCloseButton?: boolean;
  showIcon?: boolean;
  type?: 'success' | 'warning' | 'info' | 'error';
  descStyle?: StyleProp<TextStyle>;
  description: string;
  button?: buttonDef[];
};

type buttonDef = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

const statusIconMapping = {
  success: resources.icon.check,
  warning: resources.icon.warning,
  info: resources.icon.info,
  error: resources.icon.crossFill,
};

const BasicModal = (props: modalProps) => {
  const uniqueID = useId();

  const {
    animationType = 'fade',
    visible,
    onClose,
    showTitle = false,
    title,
    containerStyle,
    titleStyle,
    showCloseButton = true,
    showIcon = false,
    type = 'info',
    descStyle,
    description,
    button,
    backdropColor = 'rgba(0,0,0,0.5)',
  } = props;

  console.log(props)

  if (!visible) return null;

  return (
    <Modal
      testID={uniqueID}
      accessibilityLabel={uniqueID}
      visible={visible}
      animationType={animationType}
      hardwareAccelerated
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={[styles.backdrop, { backgroundColor: backdropColor }]}>
        <View style={[styles.modalContainer, containerStyle]}>
          {(showTitle || showCloseButton) && (
            <View style={styles.headerWrapper}>
              {showTitle && (
                <TextWrapper style={[styles.title, titleStyle]}>
                  {title}
                </TextWrapper>
              )}
              {showCloseButton && (
                <TouchableOpacity
                  style={styles.closeIconWrapper}
                  onPress={onClose}
                >
                  <FastImage
                    style={styles.closeIcon}
                    source={resources.icon.cross}
                    tintColor="#FF0000"
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          {showIcon && (
            <FastImage
              style={styles.statusIconWrapper}
              source={statusIconMapping[type]}
            />
          )}
          <TextWrapper style={[styles.descText, descStyle]}>
            {description}
          </TextWrapper>
          {button && (
            <View style={styles.buttonWrapper}>
              {button?.map((item, index) => {
                return (
                  <BasicButton
                    key={`modal-button-${index}`}
                    textStyle={item.textStyle}
                    style={[
                      item?.containerStyle,
                      {
                        width: wp(70) / button.length - 12 * 2 * (button.length - 1),
                        borderWidth: 0,
                      },
                    ]}
                    onPress={item.onPress}
                  >
                    {item.label}
                  </BasicButton>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: wp(70),
    minHeight: 200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  closeIconWrapper: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  closeIcon: {
    width: wp(4.3),
    height: wp(4.3),
  },
  statusIconWrapper: {
    width: wp(14),
    height: wp(14),
    marginBottom: 24,
  },
  descText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    paddingHorizontal: 8,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default BasicModal;
