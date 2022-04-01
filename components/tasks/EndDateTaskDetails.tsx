import React, { useEffect } from 'react';
import { LogBox, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import dateFormat from 'dateformat';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';

interface EndDateTaskDetailsProps {
  data: getTaskByID_getTaskByID;
}

export default function EndDateTaskDetails({ data }: EndDateTaskDetailsProps) {
  const navigation = useNavigation();

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
    const dataTaskUpdate = {
      name: data.name,
      description: data.description,
      projectId: data.projectId,
      advancement: data.advancement,
      endDate: date,
      tags: tagsWithoutTypename,
      estimeeSpentTime: data.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.id,
    };
    updateTask({ variables: dataTaskUpdate });
  };

  return (
    <View style={tw`flex-row w-full justify-between items-center pl-4 mt-5`}>
      <View>
        <Text style={tw`text-white opacity-70`}>Due Date:</Text>
        <Text style={tw`text-white opacity-70 font-bold`}>
          {dateFormat(new Date(data.endDate), 'dddd dd mmmm yyyy')}
        </Text>
      </View>
      <DatePicker
        date={data.endDate} // Initial date from state
        mode="date" // The enum of date, datetime and time
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          datePickerCon: {
            backgroundColor: '#15192C',
            height: '40%',
          },
          btnTextConfirm: {
            fontSize: 20,
          },
          btnTextCancel: {
            fontSize: 20,
          },
          dateText: {
            color: 'black',
            backgroundColor: 'red',
          },
          dateInput: {
            display: 'none',
          },
          dateIcon: {
            marginLeft: 70,
          },
        }}
        onDateChange={(date) => {
          onSubmit(new Date(date.split('-').reverse().join('-')));
        }}
      />
    </View>
  );
}
