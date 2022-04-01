import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { Entypo } from '@expo/vector-icons';
import { getTaskByID } from '../../API/types/getTaskByID';
import { GetOneTask } from '../../API/queries/taskQueries';
import HeaderTaskDetails from '../../components/tasks/HeaderTaskDetails';
import DescriptionTaskDetails from '../../components/tasks/DescriptionTaskDetails';
import EndDateTaskDetails from '../../components/tasks/EndDateTaskDetails';
import StatusTaskDetails from '../../components/tasks/StatusTaskDetails';
import Loader from '../../components/Loader';
import TagsTaskDetails from '../../components/tasks/TagsTaskDetails';
import ButtonsNavigation from '../../components/tasks/ButtonsNavigation';

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
});
function TaskDetails() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<paramsProps>>();

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
      <HeaderTaskDetails />
      <View style={tw`flex-row w-11/12 pb-4 items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-white text-lg font-bold`}>
            {dataTask?.getTaskByID.name}
          </Text>
          <Pressable
            style={tw`ml-2`}
            onPress={() =>
              navigation.navigate('DeleteTask', {
                id: dataTask?.getTaskByID.id,
              })
            }
          >
            <Entypo name="trash" size={15} color="white" />
          </Pressable>
        </View>
        <StatusTaskDetails status={dataTask?.getTaskByID.advancement} />
      </View>
      <TagsTaskDetails data={dataTask?.getTaskByID} />
      <EndDateTaskDetails data={dataTask?.getTaskByID} />
      <DescriptionTaskDetails description={dataTask?.getTaskByID.description} />
      <ButtonsNavigation task={dataTask?.getTaskByID} />
    </SafeAreaView>
  );
}
export default TaskDetails;
