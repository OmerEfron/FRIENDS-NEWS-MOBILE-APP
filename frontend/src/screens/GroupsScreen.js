import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GroupCard } from '../components/groups/GroupCard';
import { useTheme } from '../context/ThemeContext';
import { mockGroups } from '../constants/mockData';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';

export function GroupsScreen({ navigation }) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGroupPress = (group) => {
    navigation.navigate('GroupFeed', {
      groupId: group.id,
      groupName: group.name
    });
  };

  const handleCreateGroup = () => {
    // We'll implement the CreateGroupScreen later
    console.log('Create group pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: colors.gray[100] }]}>
          <Icon name="search" size={20} color={colors.gray[500]} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search groups..."
            placeholderTextColor={colors.gray[500]}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={handleCreateGroup}
        >
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredGroups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GroupCard group={item} onPress={() => handleGroupPress(item)} />
        )}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.gray[500] }]}>
              No groups found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: spacing.md,
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.sizes.body,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
}); 