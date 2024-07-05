/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Main from './src/navigation/Main';
import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Color from 'themes/Color';
import { globalStyles } from 'themes/Styles';

function App(): React.JSX.Element {
  const statusBarStyle =
    Platform.OS === 'android' ? 'light-content' : 'default';

  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyles.safeAreaView}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={Color.mainGrey} />
        <Main />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
