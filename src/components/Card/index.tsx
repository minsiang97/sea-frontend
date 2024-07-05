import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Color from 'themes/Color';

const Card: React.FC<ViewProps> = props => {
  const { children, style, ...restProps } = props;
  return (
    <View style={[styles.defaultStyle, style]} {...restProps}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  defaultStyle: {
    borderColor: Color.dividerGrey,
    borderWidth: 1,
    backgroundColor: Color.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
  },
});
