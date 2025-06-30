import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';

export default function IssueList({ issue }) {
  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <Title style={[styles.title, { color: colors.primary }]}>
          {issue.issueTitle}
        </Title>
        <Paragraph style={[styles.description, { color: colors.text }]}>
          {issue.issueDescription}
        </Paragraph>
        <Paragraph style={[styles.meta, { color: colors.disabled }]}>
          Room: {issue.roomNumber} | Date: {issue.dateReported} 
        </Paragraph>
        <Paragraph style={[styles.meta, { color: colors.disabled }]}>
          Assigned Person: {issue.assignedPerson}
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});
