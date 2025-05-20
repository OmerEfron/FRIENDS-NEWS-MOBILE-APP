import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../constants/typography';
import { spacing, layout } from '../../constants/spacing';
import { mockUsers } from '../../constants/mockData';

export function PostCard({ post, onPress }) {
  const { colors } = useTheme();
  const author = mockUsers.find(user => user.id === post.authorId);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

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
      <Image source={{ uri: post.media.thumbnail }} style={styles.image} />
      
      {post.isBreakingNews && (
        <View style={[styles.breakingBadge, { backgroundColor: colors.secondary }]}>
          <Text style={styles.breakingText}>BREAKING NEWS</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={[styles.headline, { color: colors.text }]}>
          {post.headline}
        </Text>
        <Text style={[styles.subheadline, { color: colors.gray[600] }]}>
          {post.subheadline}
        </Text>

        <View style={styles.footer}>
          <View style={styles.author}>
            <Image source={{ uri: author.avatar }} style={styles.avatar} />
            <Text style={[styles.authorName, { color: colors.gray[700] }]}>
              {author.displayName}
            </Text>
          </View>
          <View style={styles.meta}>
            <Icon name="time-outline" size={14} color={colors.gray[500]} />
            <Text style={[styles.timestamp, { color: colors.gray[500] }]}>
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  breakingBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  breakingText: {
    color: 'white',
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
  },
  content: {
    padding: spacing.md,
  },
  headline: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  subheadline: {
    fontSize: typography.sizes.subheadline,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: spacing.xs,
  },
  authorName: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.medium,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: typography.sizes.small,
    marginLeft: spacing.xs,
  },
}); 