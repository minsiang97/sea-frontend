import * as Keychain from 'react-native-keychain';
import { delay } from 'utils';

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
  Keychain.UserCredentials | false | undefined
> => {
  let attempt = 0;

  while (attempt < 3) {
    try {
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          title: 'Authentication to retrieve credentials',
          subtitle: '',
          description: '',
          cancel: 'Cancel',
        },
      });
      return credentials;
    } catch (error: any) {
      if (error.message === 'Wrapped error: Keystore operation failed') {
        attempt++;
        if (attempt === 3) {
          throw new Error('Fail to authenticate');
        }
        await delay(1000);
        continue;
      } else {
        throw new Error('Fail to authenticate');
      }
    }
  }
};

export const saveCredentialsWithBiometric = async (
  username: string,
  password: string,
) => {
  try {
    await Keychain.setGenericPassword(username, password, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    });
  } catch (error) {
    throw new Error('Something went wrong, please try again later');
  }
};

export const resetCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    throw new Error('Something went wrong, please try again later');
  }
};
