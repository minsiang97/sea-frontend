import { LoginProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { globalStyles } from 'themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from 'themes/Color';
import Text from 'components/Text';
import Fonts from 'themes/Fonts';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Axios from 'config/serviceProvider/axios';
import { API } from 'config/API';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  login,
  setBiometricEnabled,
  setLoading,
  setOpenErrorModal,
} from 'redux/features/auth/authSlice';
import { setUserState } from 'redux/features/user/userSlice';
import { Routes } from 'config/routes';
import {
  getCredentialsWithBiometric,
  saveCredentialsWithBiometric,
} from 'config/biometric';
import { UserCredentials } from 'react-native-keychain';
import { RefreshUserData, UserData } from 'screens/login/types';
import { setToken } from 'config/storage';
import { delay } from 'utils';

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    checkExistingKeyChainCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkExistingKeyChainCredentials = async () => {
    try {
      const credentials: UserCredentials | false | undefined =
        await getCredentialsWithBiometric();

      if (
        auth.supportedBiometricType &&
        credentials &&
        credentials.username &&
        credentials.password
      ) {
        dispatch(setBiometricEnabled(true));
        handleRefreshToken(credentials.password);
      } else {
        dispatch(setBiometricEnabled(false));
      }
    } catch (error: any) {
      // Set to true since is biometric authentication error, user able to retry for their next login
      dispatch(setBiometricEnabled(true));
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

  const handleRefreshToken = async (refreshToken: string) => {
    try {
      dispatch(setLoading(true));
      const response = await Axios.post(
        API.REFRESH,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (response.data && response.data.data) {
        const { data }: { data: RefreshUserData } = response.data;
        dispatch(login());
        dispatch(setUserState(data));
        await setToken(data.token);
        await delay(2000);
        dispatch(setLoading(false));
        navigation.navigate(Routes.TRANSACTION_HISTORY);
      }
    } catch (error: any) {
      dispatch(setLoading(false));
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

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = async (userEmail: string, userPassword: string) => {
    try {
      dispatch(setLoading(true));
      const response = await Axios.post(API.LOGIN, {
        email: userEmail,
        password: userPassword,
      });

      if (response.data && response.data.data) {
        const { data }: { data: UserData } = response.data;
        dispatch(login());
        dispatch(setUserState(data));
        dispatch(setLoading(false));
        await setToken(data.token);
        if (auth.supportedBiometricType) {
          await saveCredentialsWithBiometric(userEmail, data.refreshToken);
          if (!auth.biometricEnabled) {
            navigation.navigate(Routes.BIOMETRIC_ENABLE);
          } else {
            navigation.navigate(Routes.TRANSACTION_HISTORY);
          }
        } else {
          navigation.navigate(Routes.TRANSACTION_HISTORY);
        }
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      if (error.message === 'Something went wrong, please try again later') {
        const params = {
          errorModal: true,
          errorTitle: 'Something went wrong',
          errorMessage: 'Please try again later',
          buttonText: 'OK',
        };
        dispatch(setOpenErrorModal(params));
      } else {
        setErrorText(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <View style={globalStyles.container}>
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Icon name="arrow-left" color={Color.white} size={20} />
            </TouchableOpacity>
            <Text style={Fonts.style.h3}>Welcome !</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[Fonts.style.h4]}>Email</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errorText ? styles.errorTextInput : null,
                ]}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
              {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={[Fonts.style.h4]}>Password</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errorText ? styles.errorTextInput : null,
                ]}
                secureTextEntry
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
              />
              {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
            </View>
          </View>
        </View>
        <Button
          buttonType="primary"
          buttonText="LOGIN"
          onPress={() => handleLogin(email, password)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    left: 0,
  },
  form: {
    marginTop: 30,
  },
  textInput: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  flexContainer: {
    flex: 1,
  },
  error: {
    color: Color.red,
  },
  errorTextInput: {
    borderColor: Color.red,
    borderWidth: 1,
  },
});
