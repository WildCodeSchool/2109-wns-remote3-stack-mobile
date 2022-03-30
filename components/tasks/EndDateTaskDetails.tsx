import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dateFormat from 'dateformat';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';

interface EndDateTaskDetailsProps {
  data: getTaskByID_getTaskByID | undefined;
}

const styles = StyleSheet.create({
  datePicker: {
    width: 350,
    height: 100,
    backgroundColor: 'transparent',
  },
});
export default function EndDateTaskDetails({ data }: EndDateTaskDetailsProps) {
  const navigation = useNavigation();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [endDateUpdate, setEndDateUpdate] = useState(data?.endDate);

  // UPDATE TASK
  const [updateTask, { error }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      navigation.navigate('TaskDetails', { id: data?.id });
    },
    refetchQueries: [
      {
        query: GetOneTask,
        variables: { id: data?.id },
      },
    ],
  });
  if (error) return <Text>{error.message}</Text>;

  const showPicker = () => {
    if (isPickerShow === true) {
      setIsPickerShow(false);
    } else {
      setIsPickerShow(true);
    }
  };

  const onChange = (event: Event, date: Date | undefined) => {
    const currentDate = date || endDateUpdate;
    setEndDateUpdate(currentDate);
    const dataTaskUpdate = {
      name: data?.name,
      description: data?.description,
      projectId: data?.projectId,
      advancement: data?.advancement,
      endDate: currentDate,
      tags: [],
      estimeeSpentTime: data?.estimeeSpentTime,
      updateTaskByIdId: data?.id,
    };
    updateTask({ variables: dataTaskUpdate });
  };
  return (
    <>
      <View style={tw`flex-row w-full justify-between items-center px-3 mt-5`}>
        <Text style={{ color: '#A29EAC' }}>
          {dateFormat(
            new Date(
              data !== undefined ? data.endDate : '2021-02-07T21:04:39.573Z '
            ),
            'dddd dd mmmm yyyy'
          )}
        </Text>
        <Pressable onPress={showPicker}>
          <Ionicons name="calendar-outline" color="#A29EAC" size={20} />
        </Pressable>
      </View>
      {isPickerShow && (
        <DateTimePicker
          style={styles.datePicker}
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          value={endDateUpdate}
          onChange={() => onChange}
          mode="date"
        />
      )}
    </>
  );
}
