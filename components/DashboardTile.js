import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function DashboardTile({ title, count, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 10,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
});
