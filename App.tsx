import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@/navigation';
import { Provider } from 'react-redux';
import { store, persistor } from '@/storage/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@/i18n';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import ToastManager from 'toastify-react-native/components/ToastManager';
import { requestNotifications } from 'react-native-permissions';
import { useEffect } from 'react';
import { Platform } from 'react-native';

if(__DEV__){
  require('~/ReactotronConfig')
}

function App() {

  useEffect(() => {
    requestPermission()
  }, [])

  const requestPermission = async () => {
    await requestNotifications(
      Platform.OS === 'ios' ? ['alert', 'sound', 'badge'] : undefined,
      {
        title: 'Thông báo',
        message:
          'Ứng dụng cần quyền gửi thông báo để hiển thị thông tin quan trọng.',
        buttonPositive: 'Cho phép',
        buttonNegative: 'Từ chối',
      },
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <ToastManager showCloseIcon={false} showProgressBar={false}/>
            <NavigationContainer>
              <BottomSheetModalProvider>
                <RootStack />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
