import Text from 'components/Text';
import { Routes } from 'config/routes';
import { navigationReset } from 'navigation/NavigationService';
import { TransactionHistoryProps } from 'navigation/types';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { logout } from 'redux/features/auth/authSlice';
import { removeUserState } from 'redux/features/user/userSlice';
import { useAppDispatch } from 'redux/hooks';
import Color from 'themes/Color';
import Fonts from 'themes/Fonts';
import { globalStyles } from 'themes/Styles';

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeUserState());
    navigation.navigate(Routes.HOME);
    navigation.dispatch(navigationReset);
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogout}>
            <Icon
              name="arrow-right-from-bracket"
              size={20}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>
          <Text style={Fonts.style.h1}>Transaction History</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
  },
  contentView: {
    marginTop: 30,
  },
});
