import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';
import IssueList from '../components/IssueList';
import LoadingSpinner from '../components/LoadingSpinner';

export default function IssueDetailsScreen() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await api.get('/issues');
      setIssues(response.data);
      setLoading(false);
    };

    fetchIssues();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Issue Details</Text>
      <FlatList
        data={issues}
        renderItem={({ item }) => <IssueList issue={item} />}
        keyExtractor={(item) => item.id.toString()}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
});
