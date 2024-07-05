import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { globalStyles } from 'themes/Styles';

const Text: React.FC<TextProps> = props => {
  const { children, style, ...restProps } = props;
  return (
    <RNText style={[globalStyles.mainTextColor, style]} {...restProps}>
      {children}
    </RNText>
  );
};

export default Text;
