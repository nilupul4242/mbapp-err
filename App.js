import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import LanguageContext from './contexts/LanguageContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {
  const [language, setLanguage] = useState('en');

  return (
      <RootSiblingParent>
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <AuthProvider>
         <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </LanguageContext.Provider>
    </RootSiblingParent>
  );
}
