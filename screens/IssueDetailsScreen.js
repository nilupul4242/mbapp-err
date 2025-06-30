import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Title, useTheme, Divider, Menu, Button } from 'react-native-paper';
import IssueList from '../components/IssueList';
import LoadingSpinner from '../components/LoadingSpinner';

export default function IssueDetailsScreen() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isResolved, setIsResolved] = useState(true); // Default value
  const [menuVisible, setMenuVisible] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    fetchIssues();
  }, [isResolved]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://172.20.10.2:5000/api/Maintenance/issues?isResolved=${isResolved}`);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResolved = (value) => {
    setIsResolved(value);
    setMenuVisible(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.primary }]}>Issue Details</Title>

      {/* Filter Menu */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.filterButton}>
            Filter: {isResolved ? 'Resolved' : 'Unresolved'}
          </Button>
        }
      >
        <Menu.Item onPress={() => handleSelectResolved(true)} title="Resolved" />
        <Menu.Item onPress={() => handleSelectResolved(false)} title="Unresolved" />
      </Menu>

      <FlatList
        data={issues}
        keyExtractor={(item, index) => index.toString()}
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
  filterButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
});
