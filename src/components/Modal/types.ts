import { ModalProps } from 'react-native';

export interface ModalErrorProps extends ModalProps {
  handlePress: () => void;
  errorMessage: string;
  errorTitle: string;
  buttonText: string;
}
