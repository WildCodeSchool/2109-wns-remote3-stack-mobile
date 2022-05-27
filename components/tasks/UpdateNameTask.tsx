import { Pressable, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';
import InputText from '../form/InputText';
import Error from '../Error';

interface UpdateNameTaskProps {
  data: getTaskByID_getTaskByID;
  setUpdateName: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateNameTask({
  setUpdateName,
  data,
}: UpdateNameTaskProps): JSX.Element {
  const navigation = useNavigation();
  const { handleSubmit, control, setValue } = useForm();

  const tagsWithoutTypename = data.tags.map((tag) => {
    const { __typename, ...item } = tag;
    return item;
  });

  useEffect(() => {
    setValue('nameTask', data.name);
  }, []);
  // UPDATE TASK
  const [updateTask, { error }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      setUpdateName((prev) => !prev);
      navigation.navigate('TaskDetails', { id: data.id });
    },
    refetchQueries: [
      {
        query: GetOneTask,
        variables: { taskId: data.id },
      },
    ],
  });
  if (error) return <Error errorMessage={error.message} />;

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const userIds: string[] = [];
    data.users.map((u) => userIds.push(u.id));

    const dataTaskUpdate = {
      name: d.nameTask,
      description: data.description,
      projectId: data.projectId,
      advancement: data.advancement,
      endDate: data.endDate,
      userIds,
      tags: tagsWithoutTypename,
      estimeeSpentTime: data.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.id,
    };

    updateTask({ variables: dataTaskUpdate });
  };

  return (
    <View style={tw`w-full flex items-center mb-5`}>
      <View style={tw`w-11/12`}>
        <InputText label="Edit name" control={control} name="nameTask" />
      </View>
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
