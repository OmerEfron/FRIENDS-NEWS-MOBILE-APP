import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Header } from '../components/common/Header';
import { BreakingNewsBanner } from '../components/feed/BreakingNewsBanner';
import { PostCard } from '../components/posts/PostCard';
import { useTheme } from '../context/ThemeContext';
import { mockPosts } from '../constants/mockData';
import { spacing } from '../constants/spacing';

export function FeedScreen({ navigation }) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter(post =>
    post.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.subheadline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostPress = (post) => {
    // We'll implement this when we create the PostViewerScreen
    console.log('Post pressed:', post.id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        onSearch={setSearchQuery}
        isLive={filteredPosts.some(post => post.isBreakingNews)}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => handlePostPress(item)} />
        )}
        ListHeaderComponent={() => <BreakingNewsBanner />}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
}); 