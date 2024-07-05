import { TextStyle, TouchableOpacityProps } from 'react-native';

type ButtonType = 'primary' | 'default' | 'transparent' | 'disabled';

export interface ButtonProps extends TouchableOpacityProps {
  buttonText: string;
  buttonType?: ButtonType;
  loading?: boolean;
  textStyle?: TextStyle;
}
