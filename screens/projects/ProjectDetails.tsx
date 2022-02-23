import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { getProjectByIdId } from '../../API/types/getProjectByIdId';
import { GET_ONE_PROJECT } from '../../API/queries/projectQueries';
import HeaderOneProject from '../../components/projects/HeaderOneProject';
import ProjectInformations from '../../components/projects/ProjectInformations';
import ProjectDescription from '../../components/projects/ProjectDescription';
import ProjectNavigation from './ProjectNavigation';
import ProjectTasks from './navOptions /ProjectTasks';
import NewsFeed from './navOptions /NewsFeed';
import AssignedUser from './navOptions /AssignedUser';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8790E0',
  },
  date: {
    color: '#8790E0',
    fontSize: 13,
    paddingTop: 5,
  },
});

type RootStackParam = {
  id: { id: string };
};
export default function ProjectDetails() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [nav, setNav] = useState('tasks');

  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderOneProject projectName={data.getProjectByID.name} />
      <ProjectInformations project={data.getProjectByID} />
      <ProjectDescription description={data.getProjectByID.description} />
      <ProjectNavigation setNav={setNav} nav={nav} />
      {nav === 'tasks' && <ProjectTasks />}
      {nav === 'assignedUser' && <AssignedUser />}
      {nav === 'newsFeed' && <NewsFeed />}
    </SafeAreaView>
  );
}
