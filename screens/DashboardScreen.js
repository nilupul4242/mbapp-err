import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme, Title, Divider } from 'react-native-paper';
import api from '../services/api';
import DashboardTile from '../components/DashboardTile';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LanguageContext from '../contexts/LanguageContext';

export default function DashboardScreen({ navigation }) {
  const [dashboardData, setDashboardData] = useState({
    IssuesReportedToday: 0,
    IssuesResolvedToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);
  const { colors } = useTheme();

  const translations = {
    en: {
      issuesReportedToday: 'Issues Reported Today',
      issuesResolvedToday: 'Issues Resolved Today',
      logOut: 'Log Out',
      dashboardTitle: 'Dashboard',
    },
    es: {
      issuesReportedToday: 'Problemas Informados Hoy',
      issuesResolvedToday: 'Problemas Resueltos Hoy',
      logOut: 'Cerrar Sesión',
      dashboardTitle: 'Tablero',
    },
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator animating size="large" color={colors.primary} />
        <Text style={{ marginTop: 12, color: colors.text, fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </View>

      <Title style={[styles.title, { color: colors.primary }]}>{t.dashboardTitle}</Title>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={[styles.card, { backgroundColor: colors.surface, elevation: 6 }]}>
          <Card.Content>
            <DashboardTile
              title={t.issuesReportedToday}
              count={dashboardData.IssuesReportedToday}
              onPress={() => navigation.navigate('Issue Details')}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: colors.surface, elevation: 6 }]}>
          <Card.Content>
            <DashboardTile
              title={t.issuesResolvedToday}
              count={dashboardData.IssuesResolvedToday}
              onPress={() => navigation.navigate('Issue Details')}
            />
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  languageSwitcherContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'left',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
  },
  logoutButton: {
    borderRadius: 8,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
