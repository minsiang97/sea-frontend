import Button from 'components/Button';
import Text from 'components/Text';
import { Routes } from 'config/routes';
import { HomeProps } from 'navigation/types';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Fonts from 'themes/Fonts';
import { globalStyles } from 'themes/Styles';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const handleOnPress = () => {
    navigation.navigate(Routes.LOGIN);
  };

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <View style={[globalStyles.container, styles.container]}>
        <Text
          style={[Fonts.style.h1, globalStyles.mainTextColor, styles.title]}>
          Welcome to my mobile application
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonType="primary"
            buttonText="LOGIN"
            onPress={handleOnPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 30,
  },
});
