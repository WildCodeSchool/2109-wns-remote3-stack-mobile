import React from 'react';
import { useQuery } from '@apollo/client';
import { Text, View, FlatList } from 'react-native';

import { GET_ALL_TASKS } from '../../API/queries/taskQueries';
import OneTask from './OneTask';
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
    return <Text>...loading </Text>;
  }
  if (error || !data) {
    return <Text> error </Text>;
  }
  // eslint-disable-next-line camelcase
  const renderItem = ({ item }: any) => <OneTask item={item} />;

  return (
    <View>
      <FlatList
        data={data.getAllTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default TaskList;
