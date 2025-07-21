import {
  BasicButton,
  TextWrapper,
} from '@/components';
import BasictLayout from '@/components/layout/BasicLayout';
import request from '@/configs/axios';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const LoginScreen = () => {

  const [text, setText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchApi = () => {
    setIsLoading(true)
    request.get('posts').then(res => {
      setText(res[0].title);
      setIsLoading(false);
    });
  }

  return (
    <BasictLayout isLoading={isLoading} title="123" renderBottom={<BasicButton onPress={() => {}}>DDMM</BasicButton>}>
      <View style={styles.container}>
        <TextWrapper>{text}</TextWrapper>
        <BasicButton onPress={fetchApi}>Test</BasicButton>
      </View>
    </BasictLayout>
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
