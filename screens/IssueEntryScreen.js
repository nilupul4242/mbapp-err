import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';
import IssueForm from '../components/IssueForm';

export default function IssueEntryScreen({ navigation }) {
  const [formState, setFormState] = useState({
    roomNumber: '',
    issueTitle: '',
    issueDescription: '',
    category: '',
    source: '',
    assignedPerson: '',
  });

  const handleSubmit = async () => {
    await api.post('/add-issue', formState);
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <IssueForm formState={formState} setFormState={setFormState} onSubmit={handleSubmit} />
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