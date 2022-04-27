import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { AntDesign } from '@expo/vector-icons';
import { getTaskByID } from '../../API/types/getTaskByID';
import { GetOneTask } from '../../API/queries/taskQueries';
import HeaderTaskDetails from '../../components/tasks/HeaderTaskDetails';
import DescriptionTaskDetails from '../../components/tasks/DescriptionTaskDetails';
import EndDateTaskDetails from '../../components/tasks/EndDateTaskDetails';
import StatusTaskDetails from '../../components/tasks/StatusTaskDetails';
import Loader from '../../components/Loader';
import TagsTaskDetails from '../../components/tasks/TagsTaskDetails';
import ButtonsNavigation from '../../components/tasks/ButtonsNavigation';
import UpdateStatusTask from '../../components/tasks/UpdateStatusTask';
import UpdateNameTask from '../../components/tasks/UpdateNameTask';

type paramsProps = {
  id: { id: string };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
  title: {
    color: '#8790E0',
    fontSize: 24,
  },
  btnDelete: {
    backgroundColor: '#8790E0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8790E0',
  },
});

function TaskDetails() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<paramsProps>>();
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<boolean>(false);

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
  if (errorTask || !dataTask) {
    return <Text>erreur</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTaskDetails />
      <View style={tw`flex-row w-11/12 pb-4 items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Text style={[styles.text]}>{dataTask.getTaskByID.name}</Text>
          <Pressable onPress={() => setUpdateName(!updateName)}>
            <AntDesign style={tw`ml-1`} name="edit" size={19} color="white" />
          </Pressable>
        </View>
        <StatusTaskDetails
          updateStatus={updateStatus}
          setUpdateStatus={setUpdateStatus}
          status={dataTask.getTaskByID.advancement}
        />
      </View>
      {updateName && (
        <UpdateNameTask
          setUpdateName={setUpdateName}
          data={dataTask.getTaskByID}
        />
      )}
      {!updateStatus ? (
        <>
          <TagsTaskDetails data={dataTask.getTaskByID} />
          <EndDateTaskDetails data={dataTask.getTaskByID} />
          <DescriptionTaskDetails data={dataTask.getTaskByID} />
          <ButtonsNavigation task={dataTask.getTaskByID} />
          <Pressable
            style={[styles.btnDelete, tw`ml-2 w-11/12 py-2 mx-8 rounded-lg`]}
            onPress={() =>
              navigation.navigate('DeleteTask', {
                id: dataTask.getTaskByID.id,
              })
            }
          >
            <Text style={tw`text-white text-lg  font-bold text-center`}>
              Delete this task
            </Text>
          </Pressable>
        </>
      ) : (
        <UpdateStatusTask data={dataTask.getTaskByID} />
      )}
    </SafeAreaView>
  );
}
export default TaskDetails;
