import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProjectDetails from '../screens/projects/ProjectDetails';
import UserProfil from '../screens/UserProfil';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import CreateTask from '../screens/tasks/CreateTask';
import TaskDetails from '../screens/tasks/TaskDetails';

export default function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Userprofil"
        component={UserProfil}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Createtask"
        component={CreateTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
