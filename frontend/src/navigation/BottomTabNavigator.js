import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { FeedScreen } from '../screens/FeedScreen';
import { GroupsScreen } from '../screens/GroupsScreen';
import { GroupFeedScreen } from '../screens/GroupFeedScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';

// Placeholder screen
const ProfileScreen = () => null;

const Tab = createBottomTabNavigator();
const GroupStack = createStackNavigator();

function GroupStackNavigator() {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="GroupsList" component={GroupsScreen} options={{ title: 'Groups' }} />
      <GroupStack.Screen
        name="GroupFeed"
        component={GroupFeedScreen}
        options={({ route }) => ({
          title: route.params?.groupName || 'Group Feed',
        })}
      />
    </GroupStack.Navigator>
  );
}

export function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.gray[200],
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="people-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 