import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { useMutation, useQuery } from '@apollo/client';
import { RootStackParamList, RootTabParamList } from '../../types';
import InputText from '../../components/form/InputText';
import InputDate from '../../components/form/InputDate';
import InputNumeric from '../../components/form/InputNumeric';
import CREATE_PROJECT from '../../API/mutation/createProject';
import UPDATE_PROJECT from '../../API/mutation/updateProject';
import {
  createProject,
  createProjectVariables,
} from '../../API/types/createProject';
import {
  GET_ALL_PROJECTS,
  GET_ONE_PROJECT,
} from '../../API/queries/projectQueries';
import { getProjectByIdId } from '../../API/types/getProjectByIdId';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';

const pickerStyle = StyleSheet.create({
  inputIOS: {
    color: '#8790E0',
    backgroundColor: 'transparent',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8790E0',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginHorizontal: 17,
    marginTop: 10,
    height: 40,
    textAlign: 'left',
    fontSize: 18,
  },
  inputAndroid: {
    color: '#8790E0',
    backgroundColor: '#8790E0',
    borderRadius: 6,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginHorizontal: 12,
    marginTop: 10,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  underline: { borderTopWidth: 0 },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
  border: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
});

type ProjectScreenProps = StackNavigationProp<RootTabParamList, 'Projectlist'>;
type ProjectDetailsScreenProps = StackNavigationProp<
  RootStackParamList,
  'ProjectDetails'
> &
  ProjectScreenProps;

type RootStackParam = {
  id: { id: string };
};

export default function CreateUpdateProject() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const navigation = useNavigation<ProjectDetailsScreenProps>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [status, setStatus] = useState('');
  const [dateError, setDateError] = useState('');
  const { id }: { id: string | undefined } = route.params;
  const { handleSubmit, control, setValue } = useForm();
  const projectStatus = ['TO_DO', 'IN_PROGRESS', 'BLOCKED', 'DONE'];

  // CREATE A NEW PROJECT
  const [create, { loading: createLoading, error: createError }] = useMutation<
    createProject,
    createProjectVariables
  >(CREATE_PROJECT, {
    onCompleted: (d: createProject) => {
      navigation.navigate('ProjectDetails', { id: d.createProject.id });
    },
    refetchQueries: [GET_ALL_PROJECTS],
  });

  // UPDATE A PROJECT
  const [update, { loading: updateLoading, error: updateError }] = useMutation<{
    updateProject: GetAllProjects_getAllProjects;
  }>(UPDATE_PROJECT, {
    onCompleted: (d) => {
      navigation.navigate('ProjectDetails', { id: d.updateProject.id });
    },
  });

  // ON UPDATE GET THE PROJECT'S DATA
  const { loading: isLoading, error: isError } = useQuery<getProjectByIdId>(
    GET_ONE_PROJECT,
    {
      skip: !id,
      // ON SUCCES SET THE DEFAULT VALUE TO THE FORM'S INPUTS
      onCompleted: (d: getProjectByIdId) => {
        setStartDate(new Date(d.getProjectByID.startDate));
        setEndDate(new Date(d.getProjectByID.endDate));
        setValue('name', d.getProjectByID.name);
        setValue('description', d.getProjectByID.description);
        setStatus(d.getProjectByID.status);
        setValue(
          'estimeeSpentTime',
          d.getProjectByID.estimeeSpentTime.toString()
        );
      },
      variables: { getProjectByIdId: id },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (startDate > endDate) {
      setDateError(`You can't choose a EndDate older than the startDate`);
    } else {
      const projectData = {
        name: data.name as string,
        description: data.description as string,
        status,
        startDate,
        endDate,

        estimeeSpentTime: parseFloat(`${data.estimeeSpentTime}`),
      };

      if (id === undefined) {
        create({ variables: { ...projectData } });
      } else {
        update({ variables: { ...projectData, updateProjectId: id } });
      }
    }
  };

  if (createLoading || isLoading || updateLoading) {
    return <Text>...loading</Text>;
  }
  if (createError || isError || updateError) {
    return (
      <Text style={tw`flex-1 items-center justify-center font-bold`}>
        ...Error Hello
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          tw`flex-row w-full justify-between px-4 items-center mb-3 pb-2 mt-10`,
          styles.border,
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              navigation.navigate('Projectlist');
            }, 100);
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={40} color="white" />
        </TouchableWithoutFeedback>
        <Pressable onPress={handleSubmit(onSubmit)}>
          <Text style={tw`text-white font-bold text-lg`}>
            {id ? 'Update project' : 'Create project'}
          </Text>
        </Pressable>
      </View>
      <InputText control={control} label="Project name" name="name" />
      <InputText
        control={control}
        label="Project description"
        name="description"
      />

      <InputNumeric
        name="estimeeSpentTime"
        label="Estimee Spent Time"
        control={control}
      />
      <RNPickerSelect
        style={pickerStyle}
        placeholder={{
          label: 'Select Status',
        }}
        value={status}
        onValueChange={(value) => setStatus(value)}
        items={projectStatus.map((item) => {
          return { label: item, value: item };
        })}
      />
      <InputDate label="Start Date" setDate={setStartDate} date={startDate} />
      <InputDate label="End Date" setDate={setEndDate} date={endDate} />
      {dateError !== '' && <Text style={tw`text-red-300`}>{dateError}</Text>}
    </View>
  );
}
