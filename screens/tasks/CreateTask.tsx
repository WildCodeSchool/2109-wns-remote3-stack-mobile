import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

import CREATE_TASK from '../../API/mutation/createTask';

import { GET_ALL_PROJECTS } from '../../API/queries/projectQueries';
import InputText from '../../components/form/InputText';
import InputDate from '../../components/form/InputDate';
import InputNumeric from '../../components/form/InputNumeric';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';

interface IResponseProjects {
  getAllProjects: GetAllProjects_getAllProjects[];
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 60,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  border: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
});
export default function CreateTask() {
  const navigation = useNavigation();
  const { handleSubmit, control } = useForm();
  const [dataProjects, setDataProjects] = useState<
    GetAllProjects_getAllProjects[]
  >([]);
  const [projectIdTask, setProjectIdTask] = useState<string>('');
  const [endDateTask, setEndDateTask] = useState<Date>(new Date());

  // FETCH PROJECTS
  useQuery<IResponseProjects>(GET_ALL_PROJECTS, {
    onCompleted: (d) => {
      setDataProjects(d.getAllProjects);
    },
  });
  // CREATE A TASK
  const [createTask, { loading, error }] = useMutation(CREATE_TASK);
  if (loading) return <Text>loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  const onSubmit = (d: any) => {
    const dataTask = {
      name: d.name,
      description: d.description,
      projectId: projectIdTask,
      advancement: 'TO_DO',
      endDate: endDateTask,
      tags: [
        {
          id: '2472b301-689c-4e76-8d5d-1c497ebf776a',
          label: 'important',
          color: '#A13D3D',
        },
      ],
      estimeeSpentTime: parseFloat(`${d.estimeeSpentTime}`),
    };
    createTask({ variables: dataTask });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          tw`flex-row w-full justify-between px-5 items-center mb-3 pb-2`,
          styles.border,
        ]}
      >
        <Pressable onPress={() => navigation.navigate('TaskList' as never)}>
          <Ionicons name="chevron-back-outline" size={25} color="white" />
        </Pressable>
        <Button onPress={handleSubmit(onSubmit)} title="submit">
          <Text style={tw`text-white font-bold text-lg`}> Create Task </Text>
        </Button>
      </View>
      <InputText control={control} label="Task Name" name="name" />
      <InputText
        control={control}
        name="description"
        label="Task Description"
      />
      <InputDate label="EndDate" setDate={setEndDateTask} date={endDateTask} />
      <InputNumeric
        name="estimeeSpentTime"
        label="Estimee Spent Time"
        control={control}
      />
      <RNPickerSelect
        onValueChange={(value) => setProjectIdTask(value)}
        items={dataProjects.map((item) => {
          return { label: item.name, value: item.id };
        })}
      />
    </View>
  );
}
