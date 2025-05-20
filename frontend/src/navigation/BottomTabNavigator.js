import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { FeedScreen } from '../screens/FeedScreen';
import { GroupsScreen } from '../screens/GroupsScreen';
import { GroupFeedScreen } from '../screens/GroupFeedScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

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
  const { colors: themeColors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.gray[500],
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.gray[200],
        },
        headerStyle: {
          backgroundColor: themeColors.background,
        },
        headerTintColor: themeColors.text,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 