import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { colors } from '../../constants/colors';

// Mock data - Replace with actual data from your context/API
const mockGroups = [
  { id: '1', name: 'Close Friends', members: 8 },
  { id: '2', name: 'College Squad', members: 12 },
  { id: '3', name: 'Family', members: 6 },
  { id: '4', name: 'Work Friends', members: 15 },
  { id: '5', name: 'Book Club', members: 10 },
];

const GroupSelector = ({ selectedGroup, onSelectGroup }) => {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: themeColors.text }]}>
        Select Group
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {mockGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.groupCard,
              {
                backgroundColor:
                  selectedGroup?.id === group.id
                    ? colors.primary
                    : colors.gray[100],
              },
            ]}
            onPress={() => onSelectGroup(group)}
          >
            <MaterialIcons
              name="group"
              size={20}
              color={selectedGroup?.id === group.id ? colors.white : colors.gray[600]}
            />
            <Text
              style={[
                styles.groupName,
                {
                  color: selectedGroup?.id === group.id
                    ? colors.white
                    : themeColors.text,
                },
              ]}
            >
              {group.name}
            </Text>
            <Text
              style={[
                styles.memberCount,
                {
                  color: selectedGroup?.id === group.id
                    ? colors.white
                    : colors.gray[500],
                },
              ]}
            >
              {group.members} members
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingRight: 16,
  },
  groupCard: {
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
  },
  memberCount: {
    fontSize: 12,
  },
});

export default GroupSelector; 