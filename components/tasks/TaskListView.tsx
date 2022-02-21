import React from 'react';
import { useQuery } from '@apollo/client';
import { Text, View } from 'react-native';

import { GET_ALL_TASKS } from '../../API/queries/taskQueries';
// eslint-disable-next-line camelcase
import { GetAllTasks_getAllTasks } from '../../API/types/GetAllTasks';

interface IResponse {
  // eslint-disable-next-line camelcase
  getAllTasks: GetAllTasks_getAllTasks[];
}
function TaskList() {
  // FETCH THE TASK LIST
  const { loading, error, data } = useQuery<IResponse>(GET_ALL_TASKS);

  if (loading) {
    return <p>...loading</p>;
  }
  if (error || !data) {
    return <p>error</p>;
  }
  return (
    <View>
      <Text>tasklist</Text>
    </View>
  );
}

export default TaskList;
