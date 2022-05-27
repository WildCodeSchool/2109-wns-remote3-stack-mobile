import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { CREATE_TASK } from '../../API/mutation/Task';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';
import { GET_ALL_PROJECTS } from '../../API/queries/projectQueries';
import InputText from '../../components/form/InputText';
import InputDate from '../../components/form/InputDate';
import InputNumeric from '../../components/form/InputNumeric';
import SelectTags from '../../components/tasks/SelectTags';
import Loader from '../../components/Loader';
import { GET_ALL_TASKS } from '../../API/queries/taskQueries';
import { RootTabParamList } from '../../types';
import { getTaskByID_getTaskByID_tags } from '../../API/types/getTaskByID';
import SelectProject from '../../components/tasks/SelectProject';
import SelectStatus from '../../components/tasks/SelectStatus';
import Page404 from '../Page404';

interface IResponseProjects {
  getAllProjects: GetAllProjects_getAllProjects[];
}
type taskScreenProps = StackNavigationProp<RootTabParamList, 'TaskList'>;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 60,
  },
  border: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
  text: {
    color: '#8790E0',
  },
  button: {
    backgroundColor: '#8790E0',
  },
});
export default function CreateTask() {
  const navigation = useNavigation<taskScreenProps>();
  const { handleSubmit, control } = useForm();
  const [dataProjects, setDataProjects] = useState<
    GetAllProjects_getAllProjects[]
  >([]);
  const [projectIdTask, setProjectIdTask] = useState<string>('');
  const [advancementTask, setAdvancement] = useState<string>('');
  const [dataTags, setTags] = useState<getTaskByID_getTaskByID_tags[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [endDateTask, setEndDateTask] = useState<Date>(new Date());

  // FETCH PROJECTS
  useQuery<IResponseProjects>(GET_ALL_PROJECTS, {
    onCompleted: (d) => {
      setDataProjects(d.getAllProjects);
    },
  });
  // CREATE A TASK
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      navigation.navigate('TaskList');
    },
    refetchQueries: [GET_ALL_TASKS],
  });
  if (loading) return <Loader />;
  if (error) {
    return <Page404 />;
  }

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const tagsWithoutTypename = dataTags.map((tag) => {
      const { __typename, ...item } = tag;
      return item;
    });
    const dataTask = {
      name: d.name,
      description: d.description,
      projectId: projectIdTask,
      advancement: advancementTask,
      endDate: endDateTask,
      tags: tagsWithoutTypename,
      estimeeSpentTime: parseFloat(`${d.estimeeSpentTime}`),
    };
    createTask({ variables: dataTask });
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          isModal ? tw`opacity-50` : tw`opacity-100`,
          tw`flex-row justify-between px-4 items-center mb-3 pb-2 w-full`,
          styles.border,
        ]}
      >
        <Pressable
          style={isModal ? tw`opacity-50` : tw`opacity-100`}
          onPress={() => navigation.navigate('TaskList')}
        >
          <Ionicons name="chevron-back-outline" size={25} color="white" />
        </Pressable>
        <Button
          color="white"
          onPress={handleSubmit(onSubmit)}
          title="Create Task"
        >
          <Text style={tw`text-white font-bold text-lg`}> Create Task </Text>
        </Button>
      </View>
      <View style={tw`w-full flex flex-col items-center`}>
        <View style={tw`w-11/12`}>
          <InputText control={control} label="Task Name" name="name" />
          <InputText
            control={control}
            name="description"
            label="Task Description"
          />
          <InputNumeric
            name="estimeeSpentTime"
            label="Estimee Spent Time"
            control={control}
          />
        </View>
      </View>
      <View style={tw`mt-3 mb-5 w-11/12 flex items-center`}>
        <InputDate
          label="End date:"
          setDate={setEndDateTask}
          date={endDateTask}
        />
      </View>
      <SelectProject setProjectIdTask={setProjectIdTask} data={dataProjects} />
      <SelectStatus setAdvancement={setAdvancement} />
      <Pressable
        style={[tw`py-3 rounded-md w-11/12  mt-5`, styles.button]}
        onPress={() => setIsModal(!isModal)}
      >
        <Text style={tw`text-white text-lg text-center`}>Select Tag(s)</Text>
      </Pressable>
      <SelectTags
        setIsModal={setIsModal}
        isModal={isModal}
        setTags={setTags}
        tags={dataTags}
      />
    </View>
  );
}
