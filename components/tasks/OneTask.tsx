import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import {
  // eslint-disable-next-line camelcase
  getProjectByIdId_getProjectByID_tasks,
  getProjectByIdId,
} from '../../API/types/getProjectByIdId';
import { GetOneProject } from '../../API/queries/projectQueries';

interface OneTaskProps {
  // eslint-disable-next-line camelcase
  item: getProjectByIdId_getProjectByID_tasks;
}
const styles = StyleSheet.create({
  container: {
    borderColor: '#8790E0',
    borderRadius: 10,
    shadowColor: '#8790E0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: '#ffff',
  },
  advancementDone: {
    backgroundColor: '#2C9E7C',
  },
  advancementTodo: {
    backgroundColor: '#2B8AD1',
  },
  advancementInProgress: {
    backgroundColor: '#E4AC65',
  },
});

function OneTask({ item }: OneTaskProps) {
  const {
    loading: loadingProject,
    error: errorProject,
    data: dataProject,
  } = useQuery<getProjectByIdId>(GetOneProject, {
    variables: {
      getProjectByIdId: item.projectId,
    },
  });

  if (loadingProject) {
    return <Text>...loading </Text>;
  }
  if (errorProject || !dataProject) {
    return <Text> error </Text>;
  }
  return (
    <View style={[styles.container, tw`mx-3 p-5 border mt-5`]}>
      <View style={tw`flex-row w-full mb-2 justify-between`}>
        <View>
          <Text style={[tw`text-lg`, styles.text]}>{item.name}</Text>
          <Text style={styles.text}>{dataProject.getProjectByID.name}</Text>
        </View>
        <Text
          style={[
            tw`ml-1 py-1 px-2 h-7 text-xs`,
            styles.text,
            item.advancement === 'TODO' && styles.advancementTodo,
            item.advancement === 'IN_PROGRESS' && styles.advancementInProgress,
            item.advancement === 'DONE' && styles.advancementDone,
          ]}
        >
          {item.advancement}
        </Text>
      </View>
      <View style={tw`flex-row w-full justify-between`}>
        <Text style={styles.text}>Created at: {item.startDate}</Text>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={[tw`ml-1`, styles.text]}> 12 </Text>
        </View>
      </View>
    </View>
  );
}
export default OneTask;
