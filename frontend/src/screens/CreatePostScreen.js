import React, { useState, useCallback } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { typography } from '../constants/typography';
import { spacing, layout } from '../constants/spacing';
import { mockGroups } from '../constants/mockData';
import { colors } from '../constants/colors';
import GroupSelector from '../components/posts/GroupSelector';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isBreakingNews, setIsBreakingNews] = useState(false);
  const [media, setMedia] = useState(null);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to upload media.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  }, []);

  const handlePost = useCallback(() => {
    if (!headline.trim()) {
      Alert.alert('Error', 'Please enter a headline');
      return;
    }

    if (!selectedGroup) {
      Alert.alert('Error', 'Please select a group');
      return;
    }

    // TODO: Implement actual post creation
    console.log({
      headline,
      content,
      selectedGroup,
      isBreakingNews,
      media,
    });

    // Reset form and navigate back
    setHeadline('');
    setContent('');
    setSelectedGroup(null);
    setIsBreakingNews(false);
    setMedia(null);
    navigation.goBack();
  }, [headline, content, selectedGroup, isBreakingNews, media, navigation]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        {/* Media Upload Section */}
        <TouchableOpacity style={styles.mediaUpload} onPress={pickImage}>
          {media ? (
            <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
          ) : (
            <View style={styles.mediaPlaceholder}>
              <MaterialIcons name="add-photo-alternate" size={48} color={colors.gray[400]} />
              <Text style={[styles.mediaText, { color: themeColors.text }]}>
                Add Photo or Video
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Headline Input */}
        <TextInput
          style={[styles.headlineInput, { color: themeColors.text }]}
          placeholder="Write a catchy headline..."
          placeholderTextColor={colors.gray[400]}
          value={headline}
          onChangeText={setHeadline}
          maxLength={100}
        />

        {/* Content Input */}
        <TextInput
          style={[styles.contentInput, { color: themeColors.text }]}
          placeholder="Tell the full story..."
          placeholderTextColor={colors.gray[400]}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {/* Group Selection */}
        <GroupSelector
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />

        {/* Breaking News Toggle */}
        <TouchableOpacity
          style={[
            styles.breakingNewsToggle,
            isBreakingNews && styles.breakingNewsActive,
          ]}
          onPress={() => setIsBreakingNews(!isBreakingNews)}
        >
          <MaterialIcons
            name={isBreakingNews ? 'notifications-active' : 'notifications-none'}
            size={24}
            color={isBreakingNews ? colors.white : themeColors.text}
          />
          <Text
            style={[
              styles.breakingNewsText,
              { color: isBreakingNews ? colors.white : themeColors.text },
            ]}
          >
            Breaking News
          </Text>
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity
          style={[styles.postButton, !headline.trim() && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!headline.trim()}
        >
          <Text style={styles.postButtonText}>Post Story</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  mediaUpload: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
  mediaPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderStyle: 'dashed',
  },
  mediaText: {
    marginTop: 8,
    fontSize: 16,
  },
  headlineInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  contentInput: {
    fontSize: 16,
    minHeight: 120,
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 8,
  },
  breakingNewsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: colors.gray[100],
  },
  breakingNewsActive: {
    backgroundColor: colors.secondary,
  },
  breakingNewsText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonDisabled: {
    opacity: 0.6,
  },
  postButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export { CreatePostScreen }; 