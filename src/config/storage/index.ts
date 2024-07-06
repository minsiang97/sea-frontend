import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

export const getToken = async (key: string = 'JWT') => {
  try {
    const value = await RNSecureStorage.getItem(key);
    return value ? value : '';
  } catch (error) {
    return '';
  }
};

export const setToken = async (value: string, key: string = 'JWT') => {
  try {
    await RNSecureStorage.setItem(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  } catch (error) {
    throw new Error('Something went wrong, please try again later');
  }
};

export const removeToken = async (key: string = 'JWT') => {
  try {
    await RNSecureStorage.removeItem(key);
  } catch (error) {
    throw new Error('Something went wrong, please try again later');
  }
};
