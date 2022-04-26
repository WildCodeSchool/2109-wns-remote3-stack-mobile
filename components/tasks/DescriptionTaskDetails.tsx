import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import InputText from '../form/InputText';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';

interface DescriptionTaskDetailsProps {
  data: getTaskByID_getTaskByID;
}
const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
  text: {
    color: '#ffff',
    width: 390,
  },
  textGray: {
    color: '#A29EAC',
  },
});

export default function DescriptionTaskDetails({
  data,
}: DescriptionTaskDetailsProps) {
  const navigation = useNavigation();
  const { handleSubmit, control } = useForm();
  const [updateDescription, setUpdateDescription] = useState(false);

  const tagsWithoutTypename = data.tags.map((tag) => {
    const { __typename, ...item } = tag;
    return item;
  });

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
  if (error) return <Text>{error.message}</Text>;

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const dataTaskUpdate = {
      name: data.name,
      description: d.description,
      projectId: data.projectId,
      advancement: data.advancement,
      endDate: data.endDate,
      tags: tagsWithoutTypename,
      estimeeSpentTime: data.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.id,
    };
    updateTask({ variables: dataTaskUpdate });
    setUpdateDescription(false);
  };

  return (
    <>
      <View
        style={[
          styles.borderBottom,
          tw`flex-row justify-between items-center mt-5 w-11/12 pb-1`,
        ]}
      >
        <Text style={[styles.textGray, tw`text-lg`]}>Description</Text>
        <Pressable onPress={() => setUpdateDescription(!updateDescription)}>
          <AntDesign
            style={tw`ml-2 mr-3`}
            name="edit"
            size={19}
            color="white"
          />
        </Pressable>
      </View>
      {!updateDescription ? (
        <Text style={[styles.text, tw`w-11/12 mt-3`]}>{data.description}</Text>
      ) : (
        <View style={tw`w-11/12`}>
          <InputText control={control} name="description" label=" " />
          <Pressable
            style={tw`w-full rounded-lg bg-green-500`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`text-white text-center py-2 font-bold text-lg`}>
              Confirm New Description
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
}
