import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { GET_ONE_PROJECT } from '../../API/queries/projectQueries';
import HeaderOneProject from '../../components/projects/HeaderOneProject';
import ProjectInformations from '../../components/projects/ProjectInformations';
import ProjectDescription from '../../components/projects/ProjectDescription';
import Loader from '../../components/Loader';
import { getProjectByIdId } from '../../API/types/getProjectByIdId';
import ButtonsNavigation from '../../components/projects/ButtonsNavigation';

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
  navContainer: {
    backgroundColor: '#282D43',
  },
});

type RootStackParam = {
  id: { id: string };
};
export default function ProjectDetails() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  // const [nav, setNav] = useState('tasks');

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
      <HeaderOneProject />
      <ProjectInformations project={data.getProjectByID} />
      <ProjectDescription description={data.getProjectByID.description} />
      {/* <View style={[tw`rounded-2xl h-full mt-5`, styles.navContainer]}>
        <ProjectNavigation setNav={setNav} nav={nav} />
        {nav === 'tasks' && <ProjectTasks data={data.getProjectByID.tasks} />}
        {nav === 'assignedUser' && (
          <AssignedUser data={data.getProjectByID.members} />
        )}
        {nav === 'newsFeed' && <NewsFeed />}
      </View> */}
      <ButtonsNavigation projectId={data.getProjectByID.id} />
    </SafeAreaView>
  );
}
