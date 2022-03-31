import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import StatusNavigation from '../../../components/StatusNavigation';
import { GET_ONE_PROJECT } from '../../../API/queries/projectQueries';
import Loader from '../../../components/Loader';
import OneTask from '../../../components/tasks/OneTask';
import { getProjectByIdId } from '../../../API/types/getProjectByIdId';
import CloseModal from '../../../components/CloseModal';

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
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;

  const [taskNav, setTaskNav] = useState('TO_DO');
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
    <View style={[tw`px-4 py-5`, styles.container]}>
      <CloseModal path="ProjectDetails" id={id} />
      <Text style={tw`text-white text-xl font-bold`}>Tasks</Text>
      <StatusNavigation
        backgroundColor="light"
        nav={taskNav}
        setNav={setTaskNav}
      />
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
        renderItem={({ item }) => (
          <TouchableOpacity>
            <OneTask item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
