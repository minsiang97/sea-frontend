import React, { useEffect, useMemo } from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'screens/login';
import Home from 'screens/home';
import { StackParamList } from 'navigation/types';
import { Routes } from 'config/routes';
import TransactionHistory from 'screens/transaction/transactionHistory';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';
import Color from 'themes/Color';
import { getBiometricType, isBiometricSupported } from 'config/biometric';
import {
  closeErrorModal,
  setBiometricType,
} from 'redux/features/auth/authSlice';
import BiometricEnable from 'screens/biometric';
import TransactionDetails from 'screens/transaction/transactionDetails';
import ModalError from 'components/Modal';
import { navigationReset } from 'navigation/NavigationService';

const Stack = createNativeStackNavigator<StackParamList>();

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    checkDeviceBiometric();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkDeviceBiometric = async () => {
    const hasBiometricEnrolled = await isBiometricSupported();
    if (hasBiometricEnrolled) {
      const biometricType = await getBiometricType();
      if (biometricType) {
        dispatch(setBiometricType(biometricType));
      }
    }
  };

  const initialRoute = useMemo(
    () => (auth.isLoggedIn ? Routes.TRANSACTION_HISTORY : Routes.HOME),
    [auth],
  );

  const handlePress = () => {
    dispatch(closeErrorModal());
    if (auth.errorCode === 401) {
      navigationRef.dispatch(navigationReset);
    }

    if (auth.errorCode === 429) {
      navigationRef.current?.goBack();
    }
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.HOME} component={Home} />
          <Stack.Screen name={Routes.LOGIN} component={Login} />
          <Stack.Screen
            name={Routes.TRANSACTION_HISTORY}
            component={TransactionHistory}
          />
          <Stack.Screen
            name={Routes.BIOMETRIC_ENABLE}
            component={BiometricEnable}
          />
          <Stack.Screen
            name={Routes.TRANSACTION_DETAILS}
            component={TransactionDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Spinner
        visible={auth.isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ModalError
        visible={auth.openErrorModal}
        errorMessage={auth.errorMessage}
        buttonText={auth.buttonText}
        errorTitle={auth.errorTitle}
        handlePress={handlePress}
      />
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: Color.white,
  },
});
