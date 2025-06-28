import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LanguageContext from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <Button
        title="English"
        onPress={() => setLanguage('en')}
        color={language === 'en' ? '#4682B4' : '#ADD8E6'}
      />
      <Button
        title="Español"
        onPress={() => setLanguage('es')}
        color={language === 'es' ? '#4682B4' : '#ADD8E6'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
