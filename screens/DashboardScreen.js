import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';
import DashboardTile from '../components/DashboardTile';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LanguageContext from '../contexts/LanguageContext';

export default function DashboardScreen({ navigation }) {
  const [dashboardData, setDashboardData] = useState({});
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      issuesReportedToday: 'Issues Reported Today',
      issuesResolvedToday: 'Issues Resolved Today',
      logOut: 'Log Out',
    },
    es: {
      issuesReportedToday: 'Problemas Informados Hoy',
      issuesResolvedToday: 'Problemas Resueltos Hoy',
      logOut: 'Cerrar Sesión',
    },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await api.get('/dashboard');
      setDashboardData(response.data);
    };

    fetchDashboardData();
  }, []);

  return (
    <View style={styles.container}>
      <LanguageSwitcher />
      <DashboardTile
        title={translations[language].issuesReportedToday}
        count={dashboardData.IssuesReportedToday}
        onPress={() => navigation.navigate('Issue Details')}
      />
      <DashboardTile
        title={translations[language].issuesResolvedToday}
        count={dashboardData.IssuesResolvedToday}
        onPress={() => navigation.navigate('Issue Details')}
      />
      <Button
        title={translations[language].logOut}
        onPress={() => navigation.navigate('Login')}
        color={colors.accent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});
