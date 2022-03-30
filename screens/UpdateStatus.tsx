/* eslint-disable react/jsx-curly-brace-presence */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { useMutation, useQuery } from '@apollo/client';
import Status from '../components/Status';
import { getProjectByIdId } from '../API/types/getProjectByIdId';
import { GET_ONE_PROJECT } from '../API/queries/projectQueries';
import { GetAllProjects_getAllProjects } from '../API/types/GetAllProjects';
import UPDATE_PROJECT from '../API/mutation/updateProject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    backgroundColor: '#15192C',
    padding: 20,
  },
  disable: {
    borderWidth: 2,
    borderColor: '#15192C',
    opacity: 0.3,
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function UpdateStatus() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const navigation = useNavigation();

  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
  });

  const [update, { loading: updateLoading, error: updateError }] = useMutation<{
    createProject: GetAllProjects_getAllProjects;
  }>(UPDATE_PROJECT, {
    onCompleted: () => {
      navigation.navigate('ProjectDetails', { id });
    },
  });

  if (loading || updateLoading) {
    return <Text>...loading</Text>;
  }
  if (error || !data || updateError) {
    return <Text>error</Text>;
  }

  const onSubmit = (modifedStatus: string) => {
    const projectData = {
      name: data.getProjectByID.name as string,
      description: data.getProjectByID.description as string,
      status: modifedStatus,
      startDate: data.getProjectByID.startDate,
      endDate: data.getProjectByID.endDate,
      estimeeSpentTime: data.getProjectByID.estimeeSpentTime,
    };

    update({ variables: { ...projectData, updateProjectId: id } });
  };

  return (
    <View style={styles.container}>
      <Text
        style={tw`text-white font-bold text-xl mb-5`}
      >{`Update the project's status`}</Text>
      <Pressable
        onPress={() => onSubmit('TO_DO')}
        style={[
          tw`my-2`,
          data.getProjectByID.status === 'TO_DO' && styles.disable,
        ]}
      >
        <Status status="TO_DO" />
      </Pressable>
      <Pressable
        onPress={() => onSubmit('IN_PROGRESS')}
        style={[
          tw`my-2`,
          data.getProjectByID.status === 'IN_PROGRESS' && styles.disable,
        ]}
      >
        <Status status="IN_PROGRESS" />
      </Pressable>
      <Pressable
        onPress={() => onSubmit('DONE')}
        style={[
          tw`my-2`,
          data.getProjectByID.status === 'DONE' && styles.disable,
        ]}
      >
        <Status status="DONE" />
      </Pressable>
    </View>
  );
}
