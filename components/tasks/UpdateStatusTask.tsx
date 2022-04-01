import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';
import Status from '../Status';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15192C',
    padding: 20,
  },
  disable: {
    borderWidth: 2,
    borderColor: '#15192C',
    opacity: 0.3,
  },
});
interface UpdateStatusTaskProps {
  data: getTaskByID_getTaskByID;
}

export default function UpdateStatusTask({
  data,
}: UpdateStatusTaskProps): JSX.Element {
  const navigation = useNavigation();

  const tagsWithoutTypename = data.tags.map((tag) => {
    const { __typename, ...item } = tag;
    return item;
  });

  // UPDATE TASK
  const [updateTask, { error }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      navigation.navigate('TaskDetails', { id: data.id });
    },
    refetchQueries: [
      {
        query: GetOneTask,
        variables: { id: data.id },
      },
    ],
  });
  if (error) return <Text>{error.message}</Text>;

  const onSubmit = (status: string) => {
    const dataTaskUpdate = {
      name: data.name,
      description: data.description,
      projectId: data.projectId,
      advancement: status,
      endDate: data.endDate,
      tags: tagsWithoutTypename,
      estimeeSpentTime: data.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.id,
    };
    updateTask({ variables: dataTaskUpdate });
  };

  return (
    <View style={[tw`w-full`, styles.container]}>
      <Pressable
        onPress={() => onSubmit('TO_DO')}
        style={[tw`my-2`, data.advancement === 'TO_DO' && styles.disable]}
      >
        <Status status="TO_DO" />
      </Pressable>
      <Pressable
        onPress={() => onSubmit('IN_PROGRESS')}
        style={[tw`my-2`, data.advancement === 'IN_PROGRESS' && styles.disable]}
      >
        <Status status="IN_PROGRESS" />
      </Pressable>
      <Pressable
        onPress={() => onSubmit('DONE')}
        style={[tw`my-2`, data.advancement === 'DONE' && styles.disable]}
      >
        <Status status="DONE" />
      </Pressable>
    </View>
  );
}
