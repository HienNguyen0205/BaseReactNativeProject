import {
  BasicButton,
  BasicModal,
  TextWrapper,
} from '@/components';
import request from '@/configs/axios';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const LoginScreen = () => {

  const [text, setText] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)

  const fetchApi = () => {
    request.get('posts').then(res => {
      setText(res[0].title);
      setVisible(true);
    });
  }

  return (
    <View style={styles.container}>
      <TextWrapper>{text}</TextWrapper>
      <BasicButton onPress={fetchApi}>Test</BasicButton>
      <BasicModal
        visible={visible}
        showTitle
        title="Xin chào"
        description="Xin chào"
        showIcon
        button={[
          { label: '1', onPress: () => {}, containerStyle: { backgroundColor: 'red' } },
          { label: '2', onPress: () => {} },
        ]}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: 500,
  },
});

export default LoginScreen;
