import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {translate} from '../../translations/translate';

const LanguageComponent = () => {
  const {i18n} = useTranslation();

  const switchLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text>{translate('welcome')}</Text>
      <Text>{translate('hello_world')}</Text>
      <Button title="Switch to Hindi" onPress={() => switchLanguage('hindi')} />
      <Button
        title="Switch to English"
        onPress={() => switchLanguage('english')}
      />
    </View>
  );
};

export default LanguageComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
