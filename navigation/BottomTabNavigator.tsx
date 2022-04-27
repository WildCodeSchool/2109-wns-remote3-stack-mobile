/* eslint-disable react/no-unstable-nested-components */
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import { RootTabParamList } from '../types';
import HeaderLeft from './HeaderLeft';
import UserIcon from './UserIcon';
import HomeScreen from '../screens/HomeScreen';
import TaskList from '../screens/tasks/TaskList';
import ProjectList from '../screens/projects/ProjectList';
import Settings from '../screens/Settings';

export default function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator<RootTabParamList>();
  return (
    <BottomTab.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        headerBackground: () => (
          <View style={{ backgroundColor: '#15192C', flex: 1 }} />
        ),
        tabBarStyle: {
          position: 'absolute',
          zIndex: 20,
          height: '10%',
          paddingTop: 16,
          borderTopColor: '#8790E0',
          backgroundColor: '#15192C',
        },
        tabBarBackground: () => <View />,
      }}
    >
      <BottomTab.Screen
        name="Homepage"
        component={HomeScreen}
        options={{
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <UserIcon />,
          title: '',
          tabBarIcon: () => <Ionicons name="home" size={24} color="white" />,
        }}
      />
      <BottomTab.Screen
        name="TaskList"
        component={TaskList}
        options={{
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <UserIcon />,
          title: '',
          tabBarIcon: () => (
            <FontAwesome5 name="tasks" size={24} color="white" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Projectlist"
        component={ProjectList}
        options={{
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <UserIcon />,
          title: '',
          tabBarIcon: () => (
            <Ionicons name="ios-rocket-sharp" size={24} color="white" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <UserIcon />,
          title: '',
          tabBarIcon: () => (
            <Ionicons name="settings-sharp" size={24} color="white" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
