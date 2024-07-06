import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionHistoryData } from 'screens/transaction/transactionHistory/types';

export type StackParamList = {
  LOGIN: undefined;
  HOME: undefined;
  TRANSACTION_HISTORY: undefined;
  BIOMETRIC_ENABLE: undefined;
  TRANSACTION_DETAILS: TransactionHistoryData;
};

export type LoginProps = NativeStackScreenProps<StackParamList, 'LOGIN'>;

export type HomeProps = NativeStackScreenProps<StackParamList, 'HOME'>;
export type TransactionHistoryProps = NativeStackScreenProps<
  StackParamList,
  'TRANSACTION_HISTORY'
>;
export type BiometricEnableProps = NativeStackScreenProps<
  StackParamList,
  'BIOMETRIC_ENABLE'
>;
export type TransactionDetailsProps = NativeStackScreenProps<
  StackParamList,
  'TRANSACTION_DETAILS'
>;
