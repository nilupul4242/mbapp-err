import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Menu, Divider } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import api from '../services/api';

export default function IssueEntryScreen({ navigation }) {
  const { colors } = useTheme();

  const [formState, setFormState] = useState({
    roomNumber: '',
    issueTitle: '',
    issueDescription: '',
    category: '',
    source: '',
    assignedPerson: '',
  });

  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [assignedPersonMenuVisible, setAssignedPersonMenuVisible] = useState(false);

  const handleChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/add-issue', formState);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error submitting issue:', error);
    }
  };

  return (
    <View style={styles.container(colors)}>
      <Card style={styles.card(colors)}>
        <Card.Content>
          <TextInput
            label="Room Number"
            mode="outlined"
            value={formState.roomNumber}
            onChangeText={(text) => handleChange('roomNumber', text)}
            style={styles.input}
          />
          <TextInput
            label="Issue Title"
            mode="outlined"
            value={formState.issueTitle}
            onChangeText={(text) => handleChange('issueTitle', text)}
            style={styles.input}
          />
          <TextInput
            label="Issue Description"
            mode="outlined"
            value={formState.issueDescription}
            onChangeText={(text) => handleChange('issueDescription', text)}
            multiline
            numberOfLines={6}
            style={[styles.input, styles.textArea]}
          />
          <Menu
            visible={categoryMenuVisible}
            onDismiss={() => setCategoryMenuVisible(false)}
            anchor={
              <TextInput
                label="Category"
                mode="outlined"
                value={formState.category}
                onFocus={() => setCategoryMenuVisible(true)}
                style={styles.input}
              />
            }
          >
            <Menu.Item onPress={() => handleChange('category', 'Maintenance')} title="Maintenance" />
            <Menu.Item onPress={() => handleChange('category', 'Cleaning')} title="Cleaning" />
            <Menu.Item onPress={() => handleChange('category', 'Other')} title="Other" />
          </Menu>
          <TextInput
            label="Source"
            mode="outlined"
            value={formState.source}
            onChangeText={(text) => handleChange('source', text)}
            style={styles.input}
          />
          <Menu
            visible={assignedPersonMenuVisible}
            onDismiss={() => setAssignedPersonMenuVisible(false)}
            anchor={
              <TextInput
                label="Assigned Person"
                mode="outlined"
                value={formState.assignedPerson}
                onFocus={() => setAssignedPersonMenuVisible(true)}
                style={styles.input}
              />
            }
          >
            <Menu.Item onPress={() => handleChange('assignedPerson', 'John Doe')} title="John Doe" />
            <Menu.Item onPress={() => handleChange('assignedPerson', 'Jane Smith')} title="Jane Smith" />
            <Menu.Item onPress={() => handleChange('assignedPerson', 'Other')} title="Other" />
          </Menu>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
          >
            Submit Issue
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (colors) => ({
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    justifyContent: 'center',
  }),
  card: (colors) => ({
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    elevation: 4,
  }),
  input: {
    marginBottom: 16,
  },
  textArea: {
    height: 120,
  },
  button: {
    marginTop: 16,
  },
});
