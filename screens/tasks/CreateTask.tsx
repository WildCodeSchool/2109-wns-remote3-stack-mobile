import { Pressable, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm, FieldValues, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@apollo/client';
// eslint-disable-next-line camelcase
import CREATE_TASK from '../../API/mutation/createTask';
// eslint-disable-next-line camelcase
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';
import { GET_ALL_PROJECTS } from '../../API/queries/projectQueries';
import InputText from '../../components/form/InputText';
import InputDate from '../../components/form/InputDate';
import InputNumeric from '../../components/form/InputNumeric';
import { CreateTaskVariables } from '../../API/types/CreateTask';

interface IResponseProjects {
  // eslint-disable-next-line camelcase
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
  const [dataProjects, setDataProjects] = useState<
    // eslint-disable-next-line camelcase
    GetAllProjects_getAllProjects[]
  >([]);
  const { handleSubmit, register, control } = useForm();
  const [nameTask, setNameTask] = useState('task Name');
  const [descriptionTask, setDescriptionTask] = useState('task Description');
  const [endDateTask, setEndDateTask] = useState(new Date());
  const [estimeeSpentTimeTask, onChangeEstimeeSpentTimeTask] = useState(10);
  const [projectIdTask, setProjectIdTask] = useState(
    'ef87084b-fff1-4a0e-9a2f-470bd5d8ce26'
  );

  // CREATE A TASK
  const [create, { loading, error }] = useMutation(CREATE_TASK);
  if (loading) return <Text>loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  const onSubmit = (data: any) => {
    console.log('prout');
    console.log(data);
    // create({
    //   variables: {
    //     name: nameTask,
    //     description: descriptionTask,
    //     projectId: projectIdTask,
    //     advancement: 'TO_DO',
    //     endDate: endDateTask,
    //     tags: [
    //       {
    //         id: '2472b301-689c-4e76-8d5d-1c497ebf776a',
    //         label: 'important',
    //         color: '#A13D3D',
    //       },
    //     ],
    //     estimeeSpentTime: parseFloat(`${estimeeSpentTimeTask}`),
    //   },
    // });
  };

  // FETCH PROJECTS
  useQuery<IResponseProjects>(GET_ALL_PROJECTS, {
    onCompleted: (d) => {
      setDataProjects(d.getAllProjects);
    },
  });
  const navigation = useNavigation();
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
        {/* TODO FUNCTION SUBMIT CREATE TASK */}
        <Button onPress={handleSubmit(onSubmit)} title="submit">
          <Text style={tw`text-white font-bold text-lg`}> Create Task </Text>
        </Button>
      </View>
      <Controller
        name="toto"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            multiline
            numberOfLines={10}
            placeholderTextColor="#8790E0"
            // style={[styles.input, tw`py-3 pl-3 mt-3`]}
            placeholder="toto"
            value={value}
            onChangeText={(newText) => onChange(newText)}
          />
        )}
      />
      {/* <InputText control={control} label="Task Name" name="taskname" />
      <InputText
        control={control}
        name="taskdescription"
        label="Task Description"
      /> */}
      {/* <InputDate setDate={setEndDateTask} date={endDateTask} />
      <InputNumeric
        name="estimeespenttime"
        required
        register={register}
        onChange={onChangeEstimeeSpentTimeTask}
        label="Estimee Spent Time"
      />
      <RNPickerSelect
        onValueChange={(value) => setProjectIdTask(value)}
        items={dataProjects.map((item) => {
          return { label: item.name, value: item.id };
        })}
      /> */}
    </View>
  );
}
