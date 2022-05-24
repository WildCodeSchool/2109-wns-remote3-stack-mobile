import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';
import StatusNavigation from '../../../components/StatusNavigation';
import { GET_ONE_PROJECT } from '../../../API/queries/projectQueries';
import OneTask from '../../../components/tasks/OneTask';
import { getProjectByIdId } from '../../../API/types/getProjectByIdId';
import CloseModal from '../../../components/CloseModal';
import CreateProjectTask from '../../../components/projects/CreateProjectTask';
import ContainerLoader from '../../../components/animated/newsFeedLoaders/ContainerLoader';

type RootStackParam = {
  id: { id: string };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
});

export default function ProjectTasks() {
  const [isCreateTask, setIsCreatedTask] = useState(false);
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [taskNav, setTaskNav] = useState('TO_DO');
  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
  });

  if (loading) {
    return <ContainerLoader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <View style={[tw`px-4 py-5`, styles.container]}>
      <CloseModal path="ProjectDetails" id={id} />
      <View style={tw`flex flex-row justify-between`}>
        <Text style={tw`text-white text-xl font-bold`}>Tasks</Text>
        <Pressable onPress={() => setIsCreatedTask((prev) => !prev)}>
          <Entypo name="add-to-list" size={24} color="white" />
        </Pressable>
      </View>
      <StatusNavigation
        backgroundColor="light"
        nav={taskNav}
        setNav={setTaskNav}
      />
      {isCreateTask && (
        <CreateProjectTask
          setIsCreatedTask={setIsCreatedTask}
          projectId={data.getProjectByID.id}
          advancementTask={taskNav}
        />
      )}
      {data.getProjectByID.tasks.filter((item) => item.advancement === taskNav)
        .length === 0 && (
        <Text style={tw`text-white text-base mt-4`}>
          This project has no tasks for now ...
        </Text>
      )}
      <FlatList
        data={data.getProjectByID.tasks.filter(
          (item) => item.advancement === taskNav
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OneTask item={item} />}
      />
    </View>
  );
}
