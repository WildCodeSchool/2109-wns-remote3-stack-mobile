import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { GetOneTask, GET_ALL_TASKS } from '../../API/queries/taskQueries';
import { getTaskByID } from '../../API/types/getTaskByID';
import { DELETE_TASK } from '../../API/mutation/Task';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    padding: 20,
  },
  button: {
    backgroundColor: '#8790E0',
  },
});

type RootStackParam = {
  id: { id: string | undefined };
};

type TaskScreenProps = StackNavigationProp<RootStackParamList, 'TaskDetails'>;

export default function DeleteTask() {
  const navigation = useNavigation<TaskScreenProps>();
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;

  const { loading, error, data } = useQuery<getTaskByID>(GetOneTask, {
    variables: { taskId: id },
  });

  const [deleteTask, { loading: deleteLoad, error: deleteError }] = useMutation(
    DELETE_TASK,
    {
      refetchQueries: [
        {
          query: GET_ALL_TASKS,
        },
      ],
      onCompleted: () => {
        navigation.navigate('Root');
      },
    }
  );

  if (loading || deleteLoad) {
    return <Loader />;
  }
  if (error || !data || deleteError) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={tw`flex`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          Are you sure you want to delete the task: {data.getTaskByID.name} ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteTask({
              variables: { taskId: id },
            });
          }}
          style={[tw`w-full p-4 rounded-md my-4 mt-10`, styles.button]}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TaskDetails', { id })}
          style={[tw`w-full p-4 rounded-md my-4`, styles.button]}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
