import { CommonActions } from '@react-navigation/native';
import { Routes } from 'config/routes';

export const navigationReset = CommonActions.reset({
  index: 0,
  routes: [{ name: Routes.HOME }],
});
