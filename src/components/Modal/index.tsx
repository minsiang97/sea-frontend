import Button from 'components/Button';
import { ModalErrorProps } from 'components/Modal/types';
import Text from 'components/Text';
import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from 'themes/Color';
import Fonts from 'themes/Fonts';

const ModalError: React.FC<ModalErrorProps> = ({
  visible = false,
  style,
  animationType = 'slide',
  errorMessage,
  errorTitle,
  buttonText,
  handlePress,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const safePopupWrapper: ViewStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    paddingTop: insets.top,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: insets.bottom,
  };

  return (
    <Modal
      transparent
      animationType={animationType}
      visible={visible}
      {...restProps}>
      <TouchableWithoutFeedback>
        <View style={styles.fullScreenWrapper}>
          <View style={safePopupWrapper}>
            <View style={[styles.safePopup, style]}>
              <View>
                <Icon
                  name={'times-circle'}
                  size={60}
                  color={Color.red}
                  style={styles.icon}
                />
                <Text style={[Fonts.style.h2, styles.errorTitle]}>
                  {errorTitle}
                </Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <Button
                  onPress={handlePress}
                  style={styles.button}
                  buttonText={buttonText}
                  buttonType="primary"
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(48, 48, 48, 0.6)',
  },
  safePopup: {
    maxWidth: '100%',
    minWidth: '80%',
    maxHeight: '100%',
    backgroundColor: Color.mainGrey,
    borderRadius: 10,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    textAlign: 'center',
  },
  errorMessage: {
    marginVertical: 10,
    fontSize: Fonts.size.h3,
    textAlign: 'center',
  },
  errorTitle: {
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
});

export default ModalError;
