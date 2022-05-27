import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import InputText from '../form/InputText';
import InputNumeric from '../form/InputNumeric';
import InputDate from '../form/InputDate';
import SelectTags from '../tasks/SelectTags';
import { getTaskByID_getTaskByID_tags } from '../../API/types/getTaskByID';
import Loader from '../Loader';
import { CREATE_TASK } from '../../API/mutation/Task';
import { GET_ONE_PROJECT } from '../../API/queries/projectQueries';
import Error from '../Error';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    borderColor: '#8790E0',
  },
  btn: {
    backgroundColor: '#8790E0',
  },
  button: {
    backgroundColor: '#8790E0',
  },
});

interface IProps {
  projectId: string;
  advancementTask: string;
  setIsCreatedTask: Dispatch<SetStateAction<boolean>>;
}

export default function CreateProjectTask({
  projectId,
  advancementTask,
  setIsCreatedTask,
}: IProps) {
  const { handleSubmit, control } = useForm();
  const [endDateTask, setEndDateTask] = useState<Date>(new Date());
  const [dataTags, setTags] = useState<getTaskByID_getTaskByID_tags[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);

  // CREATE A TASK
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      setIsCreatedTask((prev) => !prev);
    },
    refetchQueries: [GET_ONE_PROJECT],
  });
  if (loading) return <Loader />;
  if (error) return <Error errorMessage={error.message} />;

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const tagsWithoutTypename = dataTags.map((tag) => {
      const { __typename, ...item } = tag;
      return item;
    });
    const dataTask = {
      name: d.name,
      description: d.description,
      projectId,
      advancement: advancementTask,
      endDate: endDateTask,
      userIds: [],
      tags: tagsWithoutTypename,
      estimeeSpentTime: parseFloat(`${d.estimeeSpentTime}`),
    };

    createTask({ variables: dataTask });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`pb-10`}
    >
      <InputText control={control} label="Task Name" name="name" />
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }: FieldValues) => (
          <TextInput
            returnKeyType="done"
            keyboardType="default"
            blurOnSubmit
            multiline
            numberOfLines={10}
            placeholderTextColor="#8790E0"
            style={[styles.input, tw`p-3 h-24 w-full rounded-md`]}
            placeholder="Description"
            value={value}
            onChangeText={(newText) => onChange(newText)}
          />
        )}
      />

      <InputNumeric
        name="estimeeSpentTime"
        label="Estimee Spent Time"
        control={control}
      />

      <InputDate
        label="End date:"
        setDate={setEndDateTask}
        date={endDateTask}
      />
      <View style={tw``}>
        <Pressable
          style={[tw`py-2 rounded-md w-full mt-5`, styles.button]}
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
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[tw`p-2 mt-5 rounded-md`, styles.btn]}
      >
        <Text style={tw`text-white text-center text-lg font-bold`}>
          Create task
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
