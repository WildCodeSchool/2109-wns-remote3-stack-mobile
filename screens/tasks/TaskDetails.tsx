import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { RouteProp, useRoute } from '@react-navigation/native';

import { getTaskByID } from '../../API/types/getTaskByID';
import { GetOneTask } from '../../API/queries/taskQueries';
import HeaderTaskDetails from '../../components/tasks/HeaderTaskDetails';
import DescriptionTaskDetails from '../../components/tasks/DescriptionTaskDetails';
import EndDateTaskDetails from '../../components/tasks/EndDateTaskDetails';
import StatusTaskDetails from '../../components/tasks/StatusTaskDetails';
import Loader from '../../components/Loader';
import CommentsTaskDetails from '../../components/tasks/CommentsTaskDetails';
import TaskNavigation from '../../components/tasks/TaskNavigation';
import TagsTaskDetails from '../../components/tasks/TagsTaskDetails';

type paramsProps = {
  id: { id: string };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  title: {
    color: '#8790E0',
    fontSize: 24,
  },
});
function TaskDetails() {
  const route = useRoute<RouteProp<paramsProps>>();
  const [nav, setNav] = useState('comments');

  const {
    loading: loadingTask,
    error: errorTask,
    data: dataTask,
  } = useQuery<getTaskByID>(GetOneTask, {
    variables: { taskId: route.params.id },
  });
  if (loadingTask) {
    return <Loader />;
  }
  if (errorTask) {
    return <Text>erreur</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTaskDetails data={dataTask?.getTaskByID} />
      <TagsTaskDetails data={dataTask?.getTaskByID} />
      <DescriptionTaskDetails description={dataTask?.getTaskByID.description} />
      <EndDateTaskDetails date={dataTask?.getTaskByID.endDate} />
      <StatusTaskDetails status={dataTask?.getTaskByID.advancement} />
      <TaskNavigation setNav={setNav} nav={nav} />
      {nav === 'comments' && (
        <CommentsTaskDetails data={dataTask?.getTaskByID} />
      )}
      {nav === 'assignedUser' && <Text>assignedUser</Text>}
      {nav === 'newsFeed' && <Text>newsFeed</Text>}
    </SafeAreaView>
  );
}
export default TaskDetails;
