import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import CREATE_TASK from '../../API/mutation/taks';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';
import { GET_ALL_PROJECTS } from '../../API/queries/projectQueries';
import InputText from '../../components/form/InputText';
import InputDate from '../../components/form/InputDate';
import InputNumeric from '../../components/form/InputNumeric';
import SelectTags from '../../components/tasks/SelectTags';
import { ITagPayload } from '../../API/types/globalTypes';

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
  border: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
  text: {
    color: '#8790E0',
  },
});
const pickerStyle = StyleSheet.create({
  inputIOS: {
    color: 'white',
    backgroundColor: '#8790E0',
    borderRadius: 6,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  inputAndroid: {
    color: '#8790E0',
    backgroundColor: '#8790E0',
    borderRadius: 6,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  underline: { borderTopWidth: 0 },
});
export default function CreateTask() {
  const navigation = useNavigation();
  const { handleSubmit, control } = useForm();
  const [dataProjects, setDataProjects] = useState<
    GetAllProjects_getAllProjects[]
  >([]);
  const [projectIdTask, setProjectIdTask] = useState<string>('');
  const [advancementTask, setAdvancement] = useState<string>('');
  const [dataTags, setTags] = useState<ITagPayload[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [endDateTask, setEndDateTask] = useState<Date>(new Date());
  const arrayStatus = [
    {
      label: 'Todo',
      value: 'TO_DO',
    },
    {
      label: 'In Progress',
      value: 'IN_PROGRESS',
    },
    {
      label: 'Done',
      value: 'DONE',
    },
  ];

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
      advancement: advancementTask,
      endDate: endDateTask,
      tags: dataTags,
      estimeeSpentTime: parseFloat(`${d.estimeeSpentTime}`),
    };
    createTask({ variables: dataTask });
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          isModal ? tw`opacity-50` : tw`opacity-100`,
          tw`flex-row w-full justify-between px-5 items-center mb-3 pb-2`,
          styles.border,
        ]}
      >
        <Pressable
          style={isModal ? tw`opacity-50` : tw`opacity-100`}
          onPress={() => navigation.navigate('TaskList' as never)}
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
      <View style={tw`mt-3 mb-5`}>
        <InputDate
          label="End date:"
          setDate={setEndDateTask}
          date={endDateTask}
        />
      </View>
      <RNPickerSelect
        style={pickerStyle}
        placeholder={{
          label: 'Select project',
        }}
        onValueChange={(value) => setProjectIdTask(value)}
        items={dataProjects.map((item) => {
          return { label: item.name, value: item.id };
        })}
      />
      <RNPickerSelect
        style={pickerStyle}
        placeholder={{
          label: 'Select status',
        }}
        onValueChange={(value) => setAdvancement(value)}
        items={arrayStatus.map((item) => {
          return { label: item.label, value: item.value };
        })}
      />
      <SelectTags
        setIsModal={setIsModal}
        isModal={isModal}
        setTags={setTags}
        tags={dataTags}
      />
    </View>
  );
}
