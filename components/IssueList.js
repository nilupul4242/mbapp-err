import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function IssueList({ issue }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{issue.title}</Text>
      <Text style={styles.description}>{issue.description}</Text>
      <Text style={styles.meta}>Room: {issue.roomNumber} | Status: {issue.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    marginVertical: 5,
  },
  meta: {
    fontSize: 12,
    color: colors.secondary,
  },
});
