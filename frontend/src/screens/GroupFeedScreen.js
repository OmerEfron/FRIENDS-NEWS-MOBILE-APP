import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PostCard } from '../components/posts/PostCard';
import { useTheme } from '../context/ThemeContext';
import { mockPosts, mockGroups } from '../constants/mockData';
import { typography } from '../constants/typography';
import { spacing, layout } from '../constants/spacing';

export function GroupFeedScreen({ route, navigation }) {
  const { groupId } = route.params;
  const { colors } = useTheme();
  
  const group = mockGroups.find(g => g.id === groupId);
  const groupPosts = mockPosts.filter(post => post.groupId === groupId);

  const handlePostPress = (post) => {
    // We'll implement the PostViewerScreen later
    console.log('Post pressed:', post.id);
  };

  const handleCreatePost = () => {
    navigation.navigate('Create', { groupId });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Group Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.groupInfo}>
          <Image source={{ uri: group.avatar }} style={styles.groupAvatar} />
          <View style={styles.groupDetails}>
            <Text style={[styles.groupName, { color: colors.text }]}>
              {group.name}
            </Text>
            <Text style={[styles.groupDescription, { color: colors.gray[600] }]}>
              {group.description}
            </Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Icon name="people-outline" size={16} color={colors.gray[500]} />
                <Text style={[styles.statText, { color: colors.gray[500] }]}>
                  {group.memberCount} members
                </Text>
              </View>
              <View style={styles.stat}>
                <Icon name="newspaper-outline" size={16} color={colors.gray[500]} />
                <Text style={[styles.statText, { color: colors.gray[500] }]}>
                  {groupPosts.length} stories
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Posts List */}
      <FlatList
        data={groupPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => handlePostPress(item)} />
        )}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.gray[500] }]}>
              No stories yet in this group
            </Text>
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: colors.primary }]}
              onPress={handleCreatePost}
            >
              <Text style={styles.createButtonText}>Create First Story</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Floating Action Button */}
      {groupPosts.length > 0 && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={handleCreatePost}
        >
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  groupDescription: {
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
    marginRight: spacing.md,
  },
  statText: {
    fontSize: typography.sizes.caption,
    marginLeft: spacing.xs,
  },
  content: {
    padding: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.sizes.body,
    marginBottom: spacing.lg,
  },
  createButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: layout.borderRadius.md,
  },
  createButtonText: {
    color: 'white',
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 