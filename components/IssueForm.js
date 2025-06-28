import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function IssueForm({ formState, setFormState, onSubmit }) {
  const handleChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Room Number</Text>
      <TextInput
        style={styles.input}
        value={formState.roomNumber}
        onChangeText={(value) => handleChange('roomNumber', value)}
      />

      <Text style={styles.label}>Issue Title</Text>
      <TextInput
        style={styles.input}
        value={formState.issueTitle}
        onChangeText={(value) => handleChange('issueTitle', value)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={formState.issueDescription}
        onChangeText={(value) => handleChange('issueDescription', value)}
      />

      <Button title="Submit" onPress={onSubmit} color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.text,
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
});
