import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import { mockBreakingNews } from '../../constants/mockData';

export function BreakingNewsBanner({ speed = 5000 }) {
  const { colors } = useTheme();
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const animation = Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: 1,
          duration: speed,
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]);

      const interval = setInterval(() => {
        setCurrentIndex((current) => (current + 1) % mockBreakingNews.length);
      }, speed);

      animation.start();

      return () => {
        clearInterval(interval);
        animation.stop();
      };
    }
  }, [currentIndex, isPaused, speed]);

  return (
    <Pressable
      onPressIn={() => setIsPaused(true)}
      onPressOut={() => setIsPaused(false)}
      style={[styles.container, { backgroundColor: colors.secondary }]}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.label}>BREAKING</Text>
      </View>
      <View style={styles.newsContainer}>
        <Animated.Text
          style={[
            styles.newsText,
            {
              transform: [
                {
                  translateX: scrollAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -300],
                  }),
                },
              ],
            },
          ]}
        >
          {mockBreakingNews[currentIndex]}
        </Animated.Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  labelContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
    marginRight: spacing.sm,
  },
  label: {
    color: 'white',
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
  },
  newsContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  newsText: {
    color: 'white',
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
  },
}); 