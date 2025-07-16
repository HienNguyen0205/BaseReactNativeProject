import React, { ReactNode, useRef, Ref, useImperativeHandle, useCallback } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type { SharedValue } from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';
import TextWrapper from '../text/TextWrapper';

type bottomSheetModalProps = {
  children: ReactNode;
  stackBahavior?: 'replace' | 'push' | 'switch';
  onDismiss?: () => void;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  enableOverDrag?: boolean;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  ref: Ref<bottomSheetModalAction>;
  title?: string;
  showCloseButton?: boolean;
  name?: string;
};

export type bottomSheetModalAction = {
  present: () => void;
  dismiss: () => void;
};

const BottomSheetModalCustom = (props: bottomSheetModalProps) => {
  const {
    ref,
    children,
    stackBahavior,
    onDismiss,
    snapPoints = [],
    enableContentPanningGesture = true,
    enableHandlePanningGesture = true,
    enableOverDrag = false,
    enablePanDownToClose = true,
    enableDynamicSizing = true,
    title,
    name,
  } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        present: handlePresent,
        dismiss: handleDismiss,
      };
    },
    [],
  );

  const handlePresent = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const handleDismiss = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
  };

  const renderBackdrop = useCallback(
    (bottomSheetBackdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...bottomSheetBackdropProps}
        opacity={0.6}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      name={name}
      ref={bottomSheetModalRef}
      stackBehavior={stackBahavior}
      onDismiss={onDismiss}
      snapPoints={snapPoints}
      enableContentPanningGesture={enableContentPanningGesture}
      enableHandlePanningGesture={enableHandlePanningGesture}
      enableOverDrag={enableOverDrag}
      enablePanDownToClose={enablePanDownToClose}
      enableDynamicSizing={enableDynamicSizing}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleStyle={styles.handleStyle}
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView style={{ flex: 1 }}>
        <BottomSheetView style={styles.container}>
          {title && (
            <View style={styles.headerWrapper}>
              <TextWrapper style={styles.title}>{title}</TextWrapper>
            </View>
          )}
          {children}
        </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    // paddingBottom: 40,
  },
  headerWrapper: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  handleStyle: {
    height: 8,
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.5
  }
});

export default BottomSheetModalCustom;
