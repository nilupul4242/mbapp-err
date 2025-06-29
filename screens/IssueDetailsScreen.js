import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Title, useTheme, Divider } from 'react-native-paper';
import IssueList from '../components/IssueList';
import LoadingSpinner from '../components/LoadingSpinner';

const sampleIssues = [
  {
    id: 1,
    title: 'Leaking Faucet',
    description: 'The faucet in room 101 is leaking constantly.',
    roomNumber: '101',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Broken AC',
    description: 'Air conditioning is not cooling in room 202.',
    roomNumber: '202',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'No Hot Water',
    description: 'There is no hot water in room 303.',
    roomNumber: '303',
    status: 'Resolved',
  },
];

export default function IssueDetailsScreen() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    // Simulate API fetch delay
    const fetchIssues = async () => {
      try {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIssues(sampleIssues);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.primary }]}>Issue Details</Title>

      <FlatList
        data={issues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <IssueList issue={item} />}
        ItemSeparatorComponent={() => <Divider style={{ marginVertical: 8 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
  },
});
