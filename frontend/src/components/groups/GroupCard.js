import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../constants/typography';
import { spacing, layout } from '../../constants/spacing';

export function GroupCard({ group, onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.gray[200]
        }
      ]}
    >
      <Image source={{ uri: group.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>
          {group.name}
        </Text>
        <Text style={[styles.description, { color: colors.gray[600] }]}>
          {group.description}
        </Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Icon name="people-outline" size={16} color={colors.gray[500]} />
            <Text style={[styles.statText, { color: colors.gray[500] }]}>
              {group.memberCount} members
            </Text>
          </View>
        </View>
      </View>
      <Icon 
        name="chevron-forward" 
        size={24} 
        color={colors.gray[400]}
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.subheadline,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.sizes.body,
    marginBottom: spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: typography.sizes.caption,
    marginLeft: spacing.xs,
  },
  arrow: {
    marginLeft: spacing.md,
  },
}); 