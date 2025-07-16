import { authStack, mainStack } from '@/constants/navigationName';
import { useAppSelector } from '@/hooks/store';
import LoginScreen from '@/screens/auth/LoginScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const RootStack = () => {

  const auth = useAppSelector(state => state.auth)

  console.log("auth", auth)

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        {auth.isLogin ? (
          <>
            <Stack.Screen name={mainStack.homeScreen} component={HomeScreen} />
          </>
        ) : (
          <Stack.Screen name={authStack.loginScreen} component={LoginScreen} />
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
