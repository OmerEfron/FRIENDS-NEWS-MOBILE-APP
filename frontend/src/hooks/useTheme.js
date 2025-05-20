import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../constants/colors';

// This is a temporary implementation until we create the ThemeContext
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    isDark,
    colors: {
      background: isDark ? colors.background.dark : colors.background.light,
      text: isDark ? colors.text.dark : colors.text.light,
      ...colors,
    },
  };
}; 