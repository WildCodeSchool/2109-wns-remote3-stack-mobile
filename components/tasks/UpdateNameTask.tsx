import { Pressable, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';
import InputText from '../form/InputText';

interface UpdateNameTaskProps {
  data: getTaskByID_getTaskByID;
}

export default function UpdateNameTask({
  data,
}: UpdateNameTaskProps): JSX.Element {
  const navigation = useNavigation();
  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    setValue('nameTask', data.name);
  }, []);
  // UPDATE TASK
  const [updateTask, { error }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      navigation.navigate('TaskDetails', { id: data.id });
    },
    refetchQueries: [
      {
        query: GetOneTask,
        variables: { id: data.id },
      },
    ],
  });
  if (error) return <Text style={tw`text-white mb-2`}>{error.message}</Text>;

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const dataTaskUpdate = {
      name: d.nameTask,
      description: data.description,
      projectId: data.projectId,
      advancement: data.advancement,
      endDate: data.endDate,
      tags: data.tags,
      estimeeSpentTime: data.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.id,
    };

    updateTask({ variables: dataTaskUpdate });
  };

  return (
    <View style={tw`w-full flex items-center mb-5`}>
      <InputText label="Edit name" control={control} name="nameTask" />
      <Pressable
        style={tw`w-11/12 bg-green-500 rounded-lg`}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tw`text-white text-center py-2 font-bold text-lg`}>
          Confirm New Name
        </Text>
      </Pressable>
    </View>
  );
}