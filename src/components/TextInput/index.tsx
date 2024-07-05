import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Color from 'themes/Color';

const TextInput: React.FC<TextInputProps> = props => {
  const { style, ...restProps } = props;
  return (
    <RNTextInput
      style={[styles.defaultStyle, style]}
      {...restProps}
      placeholderTextColor={Color.grey}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 6,
    backgroundColor: Color.lightgray,
    color: Color.white,
    fontSize: 16,
  },
});
