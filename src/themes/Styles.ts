import { StyleSheet } from 'react-native';
import Color from 'themes/Color';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.mainGrey,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Color.mainGrey,
  },
  mainTextColor: {
    color: Color.white,
  },
});
