import {
  getCredentialsWithBiometric,
  resetCredentials,
} from 'config/biometric';
import Button from 'components/Button';
import Text from 'components/Text';
import { Routes } from 'config/routes';
import { BiometricEnableProps } from 'navigation/types';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  setBiometricEnabled,
  setLoading,
  setOpenErrorModal,
} from 'redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import Fonts from 'themes/Fonts';
import { globalStyles } from 'themes/Styles';
import { delay } from 'utils';

const BiometricEnable: React.FC<BiometricEnableProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const handleAllowBiometric = async () => {
    try {
      const credentials = await getCredentialsWithBiometric();
      if (credentials) {
        dispatch(setBiometricEnabled(true));
        dispatch(setLoading(true));
        // Apply timeout in order to trigger biometrics in later screen since biometric will cache authentication for few seconds
        await delay(2000);
        dispatch(setLoading(false));
        navigation.navigate(Routes.TRANSACTION_HISTORY);
      }
    } catch (error: any) {
      if (error.message === 'Something went wrong, please try again later') {
        const params = {
          errorModal: true,
          errorTitle: 'Something went wrong',
          errorMessage: 'Please try again later',
          buttonText: 'OK',
        };
        dispatch(setOpenErrorModal(params));
      }
    }
  };

  const handleSkipBiometric = async () => {
    try {
      await resetCredentials();
      dispatch(setBiometricEnabled(false));
      navigation.navigate(Routes.TRANSACTION_HISTORY);
    } catch (error: any) {
      if (error.message === 'Something went wrong, please try again later') {
        const params = {
          errorModal: true,
          errorTitle: 'Something went wrong',
          errorMessage: 'Please try again later',
          buttonText: 'OK',
        };
        dispatch(setOpenErrorModal(params));
      }
    }
  };
  const biometricType = useAppSelector(
    state => state.auth.supportedBiometricType,
  );
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <View style={[globalStyles.container, styles.container]}>
        <Text
          style={[Fonts.style.h2, globalStyles.mainTextColor, styles.title]}>
          Do you want to allow {biometricType} ?
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonType="primary"
            buttonText="Allow"
            onPress={handleAllowBiometric}
          />
          <Button
            buttonType="transparent"
            buttonText="Skip"
            onPress={handleSkipBiometric}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BiometricEnable;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 30,
  },
});
