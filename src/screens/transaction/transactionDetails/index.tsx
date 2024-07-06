import { TransactionDetailsProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { globalStyles } from 'themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Color from 'themes/Color';
import Text from 'components/Text';
import Fonts from 'themes/Fonts';
import {
  TransactionHistoryData,
  TransactionType,
} from 'screens/transaction/transactionHistory/types';
import Axios from 'config/serviceProvider/axios';
import { API } from 'config/API';
import { parseNumberToCurrency } from 'utils/currency-utils';
import Divider from 'components/Divider';
import { parseDate } from 'utils/moment-utils';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  setBiometricAuthenticated,
  setOpenErrorModal,
  setShowAmount,
} from 'redux/features/auth/authSlice';
import { getCredentialsWithBiometric } from 'config/biometric';

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const [transaction, setTransaction] = useState<TransactionHistoryData | null>(
    null,
  );
  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    getTransactionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactionDetails = async () => {
    try {
      const response = await Axios.get(
        `${API.TRANSACTION_DETAIL}/${route.params._id}`,
      );

      if (response.data && response.data.data) {
        const { data } = response.data;
        setTransaction(data);
      }
    } catch (error: any) {
      const params = {
        errorModal: true,
        errorTitle: 'Opps',
        errorMessage: error.message,
        buttonText: 'OK',
        errorCode: 429, // Specify a unique code to run navigation back after close
      };
      dispatch(setOpenErrorModal(params));
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShowAmount = async () => {
    try {
      if (auth.isBiometricAuthenticated) {
        dispatch(setShowAmount(!auth.showAmount));
      } else {
        const credentials = await getCredentialsWithBiometric();
        if (credentials) {
          dispatch(setBiometricAuthenticated(true));
          dispatch(setShowAmount(!auth.showAmount));
        } else {
          const params = {
            errorModal: true,
            errorTitle: 'Biometric not enabled',
            errorMessage: 'Need to enable biometrics to view sensitive info',
            buttonText: 'OK',
          };
          dispatch(setOpenErrorModal(params));
          dispatch(setBiometricAuthenticated(false));
        }
      }
    } catch (error) {
      // authenthication failed
      dispatch(setBiometricAuthenticated(false));
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
            <Text style={Fonts.style.h3}>Details</Text>
          </View>
          {transaction ? (
            <View style={styles.contentView}>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>
                  {auth.showAmount
                    ? parseNumberToCurrency(transaction.amount)
                    : 'RM ****'}
                </Text>
                <TouchableOpacity onPress={handleShowAmount}>
                  <Icon
                    name={auth.showAmount ? 'eye' : 'eye-slash'}
                    size={20}
                    solid
                    color={Color.turquoise}
                  />
                </TouchableOpacity>
              </View>
              <Divider />
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsLabel}>Transaction Type</Text>
                <Text style={[Fonts.style.h4, styles.rightContent]}>
                  {
                    TransactionType[
                      transaction.type as keyof typeof TransactionType
                    ]
                  }
                </Text>
              </View>
              <Divider />
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsLabel}>Description</Text>
                <Text style={[Fonts.style.h4, styles.rightContent]}>
                  {transaction.description}
                </Text>
              </View>
              <Divider />
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsLabel}>Date/Time</Text>
                <Text style={[Fonts.style.h4, styles.rightContent]}>
                  {parseDate(transaction.createdAt, 'DD/MM/YYYY HH:mm:ss')}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;

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
  flexContainer: {
    flex: 1,
  },
  contentView: {
    marginTop: 20,
  },
  amount: {
    fontSize: 36,
    color: Color.turquoise,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsLabel: {
    fontSize: Fonts.size.h4,
    marginRight: 20,
  },
  rightContent: {
    flex: 1,
    textAlign: 'right',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
