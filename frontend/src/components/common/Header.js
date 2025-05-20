import React from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export function Header({ onSearch, isLive }) {
  const { colors } = useTheme();
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isLive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLive]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Friendlines</Text>
        {isLive && (
          <Animated.View
            style={[
              styles.liveBadge,
              { backgroundColor: colors.secondary },
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Text style={styles.liveText}>LIVE</Text>
          </Animated.View>
        )}
      </View>
      <View style={[styles.searchContainer, { backgroundColor: colors.gray[100] }]}>
        <Icon name="search" size={20} color={colors.gray[500]} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search stories..."
          placeholderTextColor={colors.gray[500]}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.bold,
    marginRight: spacing.sm,
  },
  liveBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  liveText: {
    color: 'white',
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.sizes.body,
  },
}); 