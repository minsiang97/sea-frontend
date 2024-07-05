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
import { useAppDispatch } from 'redux/hooks';
import { login, setLoading } from 'redux/features/auth/authSlice';
import { setUserState } from 'redux/features/user/userSlice';
import { Routes } from 'config/routes';
import { getCredentialsWithBiometric } from 'biometric';

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    checkExistingKeyChainCredentials();
  }, []);

  const checkExistingKeyChainCredentials = async () => {
    const credentials = await getCredentialsWithBiometric();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const response = await Axios.post(API.LOGIN, {
        email,
        password,
      });

      const { data } = response.data;
      if (data) {
        dispatch(login());
        dispatch(setUserState(data));
        dispatch(setLoading(false));
      }

      navigation.navigate(Routes.TRANSACTION_HISTORY);
    } catch (error: any) {
      dispatch(setLoading(false));
      setErrorText(error.message);
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
        <Button buttonType="primary" buttonText="LOGIN" onPress={handleLogin} />
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
