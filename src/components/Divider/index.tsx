import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Color from 'themes/Color';

const Divider: React.FC<ViewProps> = props => {
  const { style, ...restProps } = props;
  return <View style={[styles.defaultStyle, style]} {...restProps} />;
};

export default Divider;

const styles = StyleSheet.create({
  defaultStyle: {
    borderWidth: 0.5,
    borderColor: Color.dividerGrey,
    marginVertical: 20,
  },
});
