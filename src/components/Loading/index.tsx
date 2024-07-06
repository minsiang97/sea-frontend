import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import Color from 'themes/Color';

const Loading: React.FC<ActivityIndicatorProps> = props => {
  const { color, ...restProps } = props;
  return <ActivityIndicator color={color ?? Color.white} {...restProps} />;
};

export default Loading;
