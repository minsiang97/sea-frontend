import { Credentials } from 'biometric/types';
import * as Keychain from 'react-native-keychain';

export const isBiometricSupported = async (): Promise<boolean> => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    if (biometryType === null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const getBiometricType = async (): Promise<string | null> => {
  try {
    const biometricType = await Keychain.getSupportedBiometryType();
    return biometricType;
  } catch (error) {
    return null;
  }
};

export const getCredentialsWithBiometric = async (): Promise<
  Keychain.UserCredentials | boolean
> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials;
  } catch (error) {
    return false;
  }
};
