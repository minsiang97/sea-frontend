import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import { getBiometricType, isBiometricSupported } from 'biometric';
import { setBiometricType } from 'redux/features/auth/authSlice';

const Stack = createNativeStackNavigator<StackParamList>();

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

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

  const initialRoute = isLoggedIn ? Routes.TRANSACTION_HISTORY : Routes.HOME;
  return (
    <NavigationContainer>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.HOME} component={Home} />
        <Stack.Screen name={Routes.LOGIN} component={Login} />
        <Stack.Screen
          name={Routes.TRANSACTION_HISTORY}
          component={TransactionHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: Color.white,
  },
});
