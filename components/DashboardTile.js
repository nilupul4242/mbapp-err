import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

export default function DashboardTile({ title, count, onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.tile(colors)}>
      <Card style={styles.card(colors)}>
        <Card.Content style={styles.content}>
          <Text style={styles.title(colors)}>{title}</Text>
          <Text style={styles.count(colors)}>{count}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: (colors) => ({
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  }),
  card: (colors) => ({
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 4,
  }),
  content: {
    alignItems: 'center',
  },
  title: (colors) => ({
    fontSize: 18,
    color: colors.onPrimary,
    marginBottom: 10,
  }),
  count: (colors) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.onPrimary,
  }),
});
