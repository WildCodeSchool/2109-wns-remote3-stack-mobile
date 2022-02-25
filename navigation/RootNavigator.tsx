import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useQuery } from '@apollo/client';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProjectDetails from '../screens/projects/ProjectDetails';
import UserProfil from '../screens/UserProfil';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import TaskDetails from '../screens/tasks/TaskDetails';
import DeleteProject from '../screens/projects/DeleteProject';
import CreateTask from '../screens/tasks/CreateTask';
import DeleteTask from '../screens/tasks/DeleteTask';
import { useUserFromStore } from '../store/slices/user.slice';
import LogIn from '../screens/auth/Login';
import SignUp from '../screens/auth/Signup';
import { GET_SELF } from '../API/queries/userQueries';
import { GetSelf } from '../API/types/GetSelf';
import Loader from '../components/Loader';
import CreateUpdateProject from '../screens/projects/CreateUpdateProject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 60,
  },
});

export default function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { user, dispatchSelf } = useUserFromStore();
  const { loading } = useQuery<GetSelf>(GET_SELF, {
    onCompleted: (data) => dispatchSelf(data.getSelf),
  });
  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  return (
    <Stack.Navigator>
      {user.logged ? (
        <>
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
            name="CreateUpdateproject"
            component={CreateUpdateProject}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="DeleteProject"
              component={DeleteProject}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="DeleteTask"
              component={DeleteTask}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
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
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LogIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
