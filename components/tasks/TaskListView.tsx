import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GET_ALL_TASKS } from '../../API/queries/taskQueries';
import OneTask from './OneTask';
import Loader from '../Loader';
import { GetAllTasks_getAllTasks } from '../../API/types/GetAllTasks';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import StatusNavigation from '../StatusNavigation';

interface IResponse {
  getAllTasks: GetAllTasks_getAllTasks[];
}

const styles = StyleSheet.create({
  flatlist: {
    height: '88%',
    flexGrow: 0,
  },
});
function TaskList() {
  const [nav, setNav] = useState('IN_PROGRESS');
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

  const reversedData = [...data.getAllTasks].reverse();

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View style={tw`mx-4 my-2`}>
        <StatusNavigation backgroundColor="light" nav={nav} setNav={setNav} />
      </View>
      <FlatList
        data={reversedData.filter((item) => item.advancement === nav)}
        style={[styles.flatlist, tw`mx-3`]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default TaskList;
