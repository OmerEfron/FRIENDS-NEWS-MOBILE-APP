import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../constants/typography';
import { spacing, layout } from '../constants/spacing';
import { mockGroups } from '../constants/mockData';

export function CreatePostScreen({ navigation }) {
  const { colors } = useTheme();
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [content, setContent] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [media, setMedia] = useState(null);
  const [isBreaking, setIsBreaking] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setMedia(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!headline.trim() || !content.trim() || !selectedGroup || !media) {
      Alert.alert('Missing Information', 'Please fill in all required fields and add a media file.');
      return;
    }

    // For now, just log the new post
    console.log('New post:', {
      headline,
      subheadline,
      content,
      groupId: selectedGroup,
      media,
      isBreaking,
    });

    navigation.navigate('Feed');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Media Section */}
      <TouchableOpacity
        style={[styles.mediaContainer, { backgroundColor: colors.gray[100] }]}
        onPress={pickImage}
      >
        {media ? (
          <Image source={{ uri: media }} style={styles.mediaPreview} />
        ) : (
          <View style={styles.mediaPlaceholder}>
            <Icon name="image-outline" size={40} color={colors.gray[400]} />
            <Text style={[styles.mediaText, { color: colors.gray[500] }]}>
              Tap to add media
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Group Selection */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.text }]}>Select Group</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockGroups.map(group => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.groupChip,
                {
                  backgroundColor: selectedGroup === group.id ? colors.primary : colors.gray[100],
                },
              ]}
              onPress={() => setSelectedGroup(group.id)}
            >
              <Text
                style={[
                  styles.groupChipText,
                  { color: selectedGroup === group.id ? 'white' : colors.gray[600] },
                ]}
              >
                {group.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Headlines */}
      <View style={styles.section}>
        <TextInput
          style={[styles.headlineInput, { color: colors.text }]}
          placeholder="Write a catchy headline..."
          placeholderTextColor={colors.gray[400]}
          value={headline}
          onChangeText={setHeadline}
          maxLength={100}
        />
        <TextInput
          style={[styles.subheadlineInput, { color: colors.gray[600] }]}
          placeholder="Add a subheadline (optional)"
          placeholderTextColor={colors.gray[400]}
          value={subheadline}
          onChangeText={setSubheadline}
          maxLength={150}
        />
      </View>

      {/* Content */}
      <View style={styles.section}>
        <TextInput
          style={[styles.contentInput, { color: colors.text }]}
          placeholder="Write your story..."
          placeholderTextColor={colors.gray[400]}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Breaking News Toggle */}
      <TouchableOpacity
        style={styles.breakingContainer}
        onPress={() => setIsBreaking(!isBreaking)}
      >
        <Icon
          name={isBreaking ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={isBreaking ? colors.secondary : colors.gray[400]}
        />
        <Text
          style={[
            styles.breakingText,
            { color: isBreaking ? colors.secondary : colors.gray[600] },
          ]}
        >
          Mark as Breaking News
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Publish Story</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  mediaContainer: {
    height: 200,
    borderRadius: layout.borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
  mediaPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaText: {
    marginTop: spacing.sm,
    fontSize: typography.sizes.body,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.sm,
  },
  groupChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.full,
    marginRight: spacing.sm,
  },
  groupChipText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
  },
  headlineInput: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  subheadlineInput: {
    fontSize: typography.sizes.subheadline,
  },
  contentInput: {
    fontSize: typography.sizes.body,
    minHeight: 150,
  },
  breakingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  breakingText: {
    marginLeft: spacing.sm,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
  },
  submitButton: {
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
  },
}); 