import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
// eslint-disable-next-line camelcase
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { GetOneTask } from '../../API/queries/taskQueries';
import HeaderTaskDetails from '../../components/tasks/HeaderTaskDetails';
import DescriptionTaskDetails from '../../components/tasks/DescriptionTaskDetails';

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
  const route = useRoute();

  const {
    loading: loadingTask,
    error: errorTask,
    data: dataTask,
    // eslint-disable-next-line camelcase
  } = useQuery<getTaskByID_getTaskByID>(GetOneTask, {
    variables: { taskId: route?.params?.id },
  });
  if (loadingTask) {
    return <Text>...loading</Text>;
  }
  if (errorTask) {
    return <Text>erreur</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTaskDetails getTaskByID={dataTask?.getTaskByID} />
      <DescriptionTaskDetails getTaskByID={dataTask?.getTaskByID} />
    </SafeAreaView>
  );
}
export default TaskDetails;
