import React, { useEffect, useState } from 'react';
import { LogBox, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import dateFormat from 'dateformat';
import { AntDesign } from '@expo/vector-icons';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';
import InputDate from '../form/InputDate';

interface EndDateTaskDetailsProps {
  data: getTaskByID_getTaskByID;
}

export default function EndDateTaskDetails({ data }: EndDateTaskDetailsProps) {
  const navigation = useNavigation();
  const [newDate, setNewDate] = useState<Date>(new Date());
  const [isUpdate, setIsUpdate] = useState(false);

  const tagsWithoutTypename = data.tags.map((tag) => {
    const { __typename, ...item } = tag;
    return item;
  });

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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
  if (error) return <Text>{error.message}</Text>;

  const onSubmit = (date: Date) => {
    const userIds: string[] = [];
    data.users.map((u) => userIds.push(u.id));

    const dataTaskUpdate = {
      name: data.name,
      description: data.description,
      projectId: data.projectId,
      advancement: data.advancement,
      endDate: date,
      userIds,
      tags: tagsWithoutTypename,
      estimeeSpentTime: data.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.id,
    };
    updateTask({ variables: dataTaskUpdate });
    setIsUpdate(false);
  };

  return (
    <View style={tw`flex flex-col w-full items-center mt-5`}>
      <View style={tw`w-11/12 flex flex-row justify-between items-end`}>
        <View>
          <Text style={tw`text-white opacity-70`}>Due Date:</Text>
          <Text style={tw`text-white opacity-70 mt-1 font-bold`}>
            {dateFormat(new Date(data.endDate), 'dddd dd mmmm yyyy')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsUpdate((prev) => !prev)}>
          <AntDesign name="calendar" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isUpdate && (
        <View style={tw`w-full flex items-center`}>
          <View style={tw`px-4 w-full`}>
            <InputDate label="" setDate={setNewDate} date={newDate} />
          </View>
          <TouchableOpacity
            onPress={() => onSubmit(newDate)}
            style={[tw`w-11/12 mt-2 py-3 rounded-md bg-green-500`]}
          >
            <Text style={tw`text-center text-white font-bold`}>
              Edit Due Date
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
