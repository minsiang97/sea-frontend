import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  LOGIN: undefined;
  HOME: undefined;
  TRANSACTION_HISTORY: undefined;
};

export type LoginProps = NativeStackScreenProps<StackParamList, 'LOGIN'>;

export type HomeProps = NativeStackScreenProps<StackParamList, 'HOME'>;
export type TransactionHistoryProps = NativeStackScreenProps<
  StackParamList,
  'TRANSACTION_HISTORY'
>;
