import Card from 'components/Card';
import Loading from 'components/Loading';
import Text from 'components/Text';
import { API } from 'config/API';
import { Routes } from 'config/routes';
import Axios from 'config/serviceProvider/axios';
import { removeToken } from 'config/storage';
import { navigationReset } from 'navigation/NavigationService';
import { TransactionHistoryProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
  logout,
  removeAuthState,
  setBiometricAuthenticated,
  setOpenErrorModal,
  setShowAmount,
} from 'redux/features/auth/authSlice';
import { removeUserState } from 'redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  TransactionHistoryData,
  TransactionHistoryResponse,
  TransactionType,
} from 'screens/transaction/transactionHistory/types';
import Color from 'themes/Color';
import Fonts from 'themes/Fonts';
import { globalStyles } from 'themes/Styles';
import debounce from 'lodash/debounce';
import { parseNumberToCurrency } from 'utils/currency-utils';
import { parseDate } from 'utils/moment-utils';
import { getCredentialsWithBiometric } from 'config/biometric';

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  navigation,
}) => {
  const [page, setPage] = useState<number>(1);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryData[]
  >([]);
  const [totalList, setTotalList] = useState<number>(0);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const limit = 10;

  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const handleLogout = async () => {
    dispatch(logout());
    dispatch(removeUserState());
    dispatch(removeAuthState());
    await removeToken();
    navigation.dispatch(navigationReset);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Apply timeout in order to trigger biometrics since biometric authentication is cached for few seconds
      getTransactionHistory();
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactionHistory = async (type?: string) => {
    const params = {
      page: type === 'refresh' ? 1 : page,
      limit,
    };
    try {
      setIsLoading(true);
      const response = await Axios.get(API.TRANSACTION_HISTORY, {
        params,
      });

      if (response.data && response.data.data) {
        const { data, total }: TransactionHistoryResponse = response.data;
        const newArray = [...transactionHistory];
        setTotalList(total);
        setTransactionHistory(
          type === 'refresh' ? data : [...newArray, ...data],
        );
        setPage(type === 'refresh' ? 2 : page + 1);
        setIsLoading(false);
        setRefreshLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setRefreshLoading(false);
      const errorParams = {
        errorModal: true,
        errorTitle: 'Opps',
        errorMessage: error.message,
        buttonText: 'OK',
      };
      dispatch(setOpenErrorModal(errorParams));
    }
  };

  const debouncedGetTransaction = debounce(getTransactionHistory, 500);

  const renderFooter = () => (
    <>
      {totalList === transactionHistory.length ? (
        <View style={styles.footer}>
          <Text>No more transaction available</Text>
        </View>
      ) : (
        <>{transactionHistory.length > 0 && loading ? <Loading /> : null}</>
      )}
    </>
  );

  const renderEmptyContent = () => (
    <View style={styles.emptyContent}>
      {loading && !refreshLoading ? (
        <Loading size={40} />
      ) : (
        <Text>No Transactions available</Text>
      )}
    </View>
  );

  const handleRefresh = () => {
    setRefreshLoading(true);
    getTransactionHistory('refresh');
  };

  const retrieveMoreData = () => {
    if (
      transactionHistory.length > 0 &&
      transactionHistory.length !== totalList
    ) {
      debouncedGetTransaction();
    }
  };

  const handleOnClick = (item: TransactionHistoryData) => {
    navigation.navigate(Routes.TRANSACTION_DETAILS, item);
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
      <View style={[globalStyles.container, styles.container]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogout}>
            <Icon
              name="arrow-right-from-bracket"
              size={20}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalPad}>
          <Text style={Fonts.style.h1}>Transaction History</Text>
        </View>
        <View style={[styles.horizontalPad, styles.showInfo]}>
          {transactionHistory.length > 0 ? (
            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleShowAmount}
              disabled={transactionHistory.length < 1}>
              <Text>{auth.showAmount ? 'Hide' : 'Show'} sensitive info</Text>
              <Icon
                style={styles.icon}
                name={auth.showAmount ? 'eye' : 'eye-slash'}
                size={20}
                solid
                color={Color.white}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.contentView}>
          <FlatList
            data={transactionHistory}
            style={styles.flatList}
            contentContainerStyle={[
              styles.horizontalPad,
              styles.flatListContentContainer,
            ]}
            keyExtractor={item => item._id}
            ListEmptyComponent={renderEmptyContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshLoading}
                onRefresh={handleRefresh}
                tintColor={Color.white}
              />
            }
            onEndReached={retrieveMoreData}
            ListFooterComponent={
              transactionHistory.length > 0 ? renderFooter : null
            }
            renderItem={({ item }: { item: TransactionHistoryData }) => {
              return (
                <TouchableOpacity onPress={() => handleOnClick(item)}>
                  <Card style={styles.card}>
                    <View style={styles.detailsContainer}>
                      <Text
                        numberOfLines={1}
                        style={[Fonts.style.h3, styles.flex]}>
                        {item.description}
                      </Text>
                      <Text style={[Fonts.style.h3, styles.rightContent]}>
                        {auth.showAmount
                          ? parseNumberToCurrency(item.amount)
                          : 'RM ****'}
                      </Text>
                    </View>
                    <View style={[styles.detailsContainer, styles.secondRow]}>
                      <Text>
                        {
                          TransactionType[
                            item.type as keyof typeof TransactionType
                          ]
                        }
                      </Text>
                      <Text>
                        {parseDate(item.createdAt, 'DD/MM/YYYY HH:mm:ss')}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  contentView: {
    marginTop: 30,
    flex: 1,
  },
  card: {
    marginBottom: 20,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  horizontalPad: {
    paddingHorizontal: 20,
  },
  flatList: {
    marginBottom: 30,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  secondRow: {
    marginTop: 10,
  },
  flex: {
    flex: 1,
  },
  rightContent: {
    marginLeft: 20,
  },
  amountContainer: {},
  icon: {
    marginLeft: 10,
  },
  showInfo: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
