import React from 'react';
import { useQuery } from '@apollo/client';
import { Text, View, FlatList } from 'react-native';

import { GET_ALL_TASKS } from '../../API/queries/taskQueries';
import OneTask from './OneTask';
import Loader from '../Loader';

import { GetAllTasks_getAllTasks } from '../../API/types/GetAllTasks';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';

interface IResponse {
  getAllTasks: GetAllTasks_getAllTasks[];
}
function TaskList() {
  // FETCH THE TASK LIST
  const { loading, error, data } = useQuery<IResponse>(GET_ALL_TASKS);

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text> error </Text>;
  }
  const renderItem = ({ item }: { item: getTaskByID_getTaskByID }) => (
    <OneTask item={item} />
  );

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <FlatList
        data={data.getAllTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default TaskList;
